// API Xử lý Tặng Sao (Gift Transaction API).
// Đây là endpoint quan trọng nhất trong hệ thống, chứa logic nghiệp vụ cốt lõi về tài chính (sao).

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { streamId, senderId, starAmount, message } = body;

    // ==========================================
    // 1. KIỂM TRA ĐẦU VÀO (INPUT VALIDATION) & CHỐNG HACK SỐ LƯỢNG SAO
    // ==========================================
    if (!streamId || !senderId || !starAmount) {
      return NextResponse.json(
        { error: "Thiếu thông tin giao dịch!" },
        { status: 400 }
      );
    }

    // Bảo mật: Kẻ tấn công có thể cố tình gửi số sao âm (ví dụ: -100 sao) hoặc số thập phân.
    // Nếu không chặn, tài khoản người gửi sẽ được CỘNG THÊM sao và tài khoản streamer bị TRỪ sao.
    if (!Number.isInteger(starAmount) || starAmount <= 0) {
      return NextResponse.json(
        { error: "Số lượng sao tặng phải là số nguyên dương lớn hơn 0!" },
        { status: 400 }
      );
    }

    // ==========================================
    // 2. KIẾN THỨC BE: ACID TRANSACTION (GIAO DỊCH ĐỒNG NHẤT)
    // ==========================================
    // Việc tặng sao đòi hỏi 5 bước thao tác cơ sở dữ liệu:
    //   B1: Trừ số dư sao của Viewer (Người gửi).
    //   B2: Cộng số dư sao của Streamer (Người nhận).
    //   B3: Cộng dồn số sao tích lũy vào phiên Stream hiện tại (để hiển thị tổng số sao nhận được).
    //   B4: Tạo bản ghi GiftTransaction (lịch sử giao dịch).
    //   B5: Tạo một bản ghi Comment đặc biệt dạng "Đã tặng X sao!" trong phòng chat.
    //
    // NGUY CƠ: Nếu B1 thành công nhưng B2 thất bại (ví dụ: mất điện giữa chừng), sao của Viewer sẽ bị mất mà Streamer không nhận được.
    // GIẢI PHÁP: Sử dụng Prisma Transaction (`prisma.$transaction`).
    // Cơ chế này đảm bảo tính "Atomicity" (Tính nguyên tử) - Hoặc tất cả cùng thành công, hoặc nếu có một bước lỗi
    // thì TOÀN BỘ các bước trước đó sẽ bị HỦY BỎ (Rollback), đưa database về trạng thái ban đầu.
    const result = await prisma.$transaction(async (tx) => {
      
      // Bước A: Kiểm tra người gửi có tồn tại và đủ số dư hay không
      // Sử dụng `tx` (transaction client) thay vì `prisma` thông thường.
      const sender = await tx.user.findUnique({
        where: { id: senderId },
      });

      if (!sender) {
        throw new Error("Không tìm thấy thông tin người tặng sao!");
      }

      // KIẾN THỨC BẢO MẬT: CHỐNG LỖI RACE CONDITION & DOUBLE SPENDING
      // Nếu Viewer nhấn nút tặng sao liên tục cực nhanh (hoặc gửi song song nhiều request),
      // nếu không kiểm tra số dư cẩn thận tại thời điểm chạy giao dịch, họ có thể "tiêu lạm" số dư âm.
      if (sender.starBalance < starAmount) {
        throw new Error("Số dư sao của bạn không đủ để thực hiện giao dịch này!");
      }

      // Bước B: Tìm phòng stream để lấy ID Streamer (người nhận) và xác nhận phòng vẫn đang LIVE
      const stream = await tx.stream.findUnique({
        where: { id: streamId },
        include: { streamer: true }
      });

      if (!stream) {
        throw new Error("Phòng livestream không tồn tại!");
      }
      if (stream.status !== "LIVE") {
        throw new Error("Luồng phát sóng này đã kết thúc, không thể tặng sao!");
      }

      const receiverId = stream.streamerId;

      // Bảo mật: Tránh tự tặng sao cho chính mình (nếu nghiệp vụ không cho phép)
      if (senderId === receiverId) {
        throw new Error("Bạn không thể tự tặng sao cho chính mình!");
      }

      // Bước C: Trừ sao của người gửi và cộng dồn số sao đã tặng
      const updatedSender = await tx.user.update({
        where: { id: senderId },
        data: {
          starBalance: {
            decrement: starAmount, // Prisma tự dịch thành câu lệnh SQL: SET starBalance = starBalance - X
          },
          starsGifted: {
            increment: starAmount,
          },
        },
      });

      // Bước D: Cộng sao cho streamer (Người nhận) và cộng dồn số sao đã nhận
      await tx.user.update({
        where: { id: receiverId },
        data: {
          starBalance: {
            increment: starAmount,
          },
          starsEarned: {
            increment: starAmount,
          },
        },
      });

      // Bước E: Cập nhật tổng số sao nhận được
      const updatedStream = await tx.stream.update({
        where: { id: streamId },
        data: {
          totalStars: {
            increment: starAmount,
          },
        },
      });

      // Cập nhật mục tiêu nhóm hoạt động (ACTIVE) nếu có
      let currentActiveGoal = await tx.streamGoal.findFirst({
        where: {
          streamId,
          status: "ACTIVE",
        },
      });

      if (currentActiveGoal) {
        currentActiveGoal = await tx.streamGoal.update({
          where: { id: currentActiveGoal.id },
          data: {
            currentStars: {
              increment: starAmount,
            },
          },
        });
        
        // Nếu đạt mục tiêu, tự động đổi status thành ACHIEVED
        if (currentActiveGoal.currentStars >= currentActiveGoal.targetStars) {
          currentActiveGoal = await tx.streamGoal.update({
            where: { id: currentActiveGoal.id },
            data: { status: "ACHIEVED" },
          });
        }
      }

      // Bước E.2: Cập nhật điểm PK Battle nếu có trận chiến đang diễn ra
      const activeBattle = await tx.pKBattle.findFirst({
        where: {
          status: "LIVE",
          OR: [
            { streamId1: streamId },
            { streamId2: streamId },
          ],
        },
      });

      if (activeBattle) {
        if (activeBattle.streamId1 === streamId) {
          await tx.pKBattle.update({
            where: { id: activeBattle.id },
            data: { score1: { increment: starAmount } },
          });
        } else {
          await tx.pKBattle.update({
            where: { id: activeBattle.id },
            data: { score2: { increment: starAmount } },
          });
        }
      }

      // Bước F: Ghi nhận lịch sử giao dịch tặng quà
      const transaction = await tx.giftTransaction.create({
        data: {
          streamId,
          senderId,
          receiverId,
          starAmount,
          message: message?.trim() || null,
        },
      });

      // Bước G: Tự động chèn một bình luận đặc biệt vào phòng chat
      const chatMessage = `Đã tặng ${starAmount} sao! 🌟 ${message ? `"${message}"` : ""}`;
      const comment = await tx.comment.create({
        data: {
          streamId,
          senderId,
          text: chatMessage,
          isGift: true,
          giftStars: starAmount,
        },
      });

      // Trả về kết quả giao dịch sau khi chạy transaction thành công
      const finalBattle = activeBattle
        ? await tx.pKBattle.findUnique({ where: { id: activeBattle.id } })
        : null;

      return {
        updatedSenderBalance: updatedSender.starBalance,
        totalStars: updatedStream.totalStars,
        goalCurrent: currentActiveGoal ? currentActiveGoal.currentStars : 0,
        transactionId: transaction.id,
        comment,
        pkBattle: finalBattle,
      };
    });

    // ==========================================
    // 3. KIẾN THỨC BE: PHÂN TÁCH KIẾN TRÚC SERVERLESS VÀ WEBSOCKET
    // ==========================================
    // Tại sao chúng ta không kết nối trực tiếp WebSocket từ Next.js API này để gửi thông báo?
    // - Next.js Route Handlers được tối ưu cho kiến trúc phi trạng thái (Stateless/Serverless).
    //   Nếu mỗi API request lại khởi tạo kết nối TCP mới tới WebSocket server, nó sẽ làm chậm response và quá tải server.
    // - Giải pháp tối ưu: API trả về kết quả thành công cho Trình duyệt của Viewer (Client).
    //   Sau đó, trình duyệt Client (đã giữ kết nối WebSocket liên tục trên cổng 3001) sẽ gửi tin nhắn "gift-sent"
    //   tới WS Server để thông báo cho toàn phòng. Điều này giữ cho API Route luôn nhẹ nhàng và phản hồi siêu nhanh.
    return NextResponse.json({
      success: true,
      message: "Tặng sao thành công!",
      data: result,
    });
  } catch (error: any) {
    console.error("❌ Lỗi API Post Gift (Transaction Rolled Back):", error?.message);
    return NextResponse.json(
      { error: error?.message || "Giao dịch tặng sao thất bại!" },
      { status: 400 } // Bad Request - Thường do thiếu số dư hoặc nhập sai
    );
  }
}
