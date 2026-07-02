import { NextResponse } from "next/server";
import { prisma } from "@/backend/shared/database/prisma";
import { redis } from "@/backend/shared/cache/redis";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { predictionId, streamerId, winOption } = body;

    if (!predictionId || !streamerId || !winOption) {
      return NextResponse.json({ error: "Thiếu thông tin kết quả dự đoán!" }, { status: 400 });
    }

    if (winOption !== "A" && winOption !== "B" && winOption !== "CANCELLED") {
      return NextResponse.json({ error: "Kết quả không hợp lệ (chỉ được chọn A, B hoặc CANCELLED)!" }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      // 1. Tìm kèo dự đoán kèm theo danh sách đặt cược
      const prediction = await tx.prediction.findUnique({
        where: { id: predictionId },
        include: {
          stream: true,
          bets: true,
        },
      });

      if (!prediction) {
        throw new Error("Không tìm thấy kèo dự đoán!");
      }

      // 2. Xác thực quyền Streamer
      if (prediction.stream.streamerId !== streamerId) {
        throw new Error("Bạn không có quyền cập nhật kết quả trong phòng này!");
      }

      if (prediction.status !== "ACTIVE" && prediction.status !== "LOCKED") {
        throw new Error("Kèo dự đoán này đã kết thúc từ trước!");
      }

      // 3. Xử lý kịch bản HỦY KÈO (CANCELLED) -> Hoàn tiền cược cho tất cả mọi người
      if (winOption === "CANCELLED") {
        for (const bet of prediction.bets) {
          await tx.user.update({
            where: { id: bet.userId },
            data: {
              starBalance: { increment: bet.starAmount },
              starsGifted: { decrement: bet.starAmount }, // Trả lại EXP/sao tích lũy
            },
          });
        }

        const updatedPrediction = await tx.prediction.update({
          where: { id: predictionId },
          data: {
            status: "CANCELLED",
            endedAt: new Date(),
          },
          include: { bets: true },
        });

        // Tạo comment hệ thống báo hủy kèo
        await tx.comment.create({
          data: {
            streamId: prediction.streamId,
            senderId: streamerId,
            text: `🚫 Kèo dự đoán: "${prediction.title}" đã bị HỦY. Hoàn trả lại ${prediction.totalStarsA + prediction.totalStarsB} sao cho tất cả người chơi!`,
            isGift: false,
          },
        });

        return { prediction: updatedPrediction, payouts: [] };
      }

      // 4. Xử lý kịch bản CÓ KẾT QUẢ THẮNG (A hoặc B)
      const totalA = prediction.totalStarsA;
      const totalB = prediction.totalStarsB;
      const totalPool = totalA + totalB;

      const winningOption = winOption; // "A" or "B"
      const winningTotalStars = winningOption === "A" ? totalA : totalB;

      const winningBets = prediction.bets.filter((b) => b.option === winningOption);
      const payoutDetails: Array<{ userId: string; amount: number }> = [];

      if (totalPool > 0) {
        if (winningTotalStars === 0) {
          // TH đặc biệt: Có người cược bên thua nhưng không ai cược bên thắng -> Hoàn trả sao cho bên cược thua
          for (const bet of prediction.bets) {
            await tx.user.update({
              where: { id: bet.userId },
              data: {
                starBalance: { increment: bet.starAmount },
                starsGifted: { decrement: bet.starAmount },
              },
            });
          }
        } else {
          // Phân phối quỹ thưởng cho những người thắng
          for (const bet of winningBets) {
            // Payout = Số sao cược * Tổng quỹ cược / Tổng cược bên thắng
            const payoutAmount = Math.floor((bet.starAmount * totalPool) / winningTotalStars);
            
            await tx.user.update({
              where: { id: bet.userId },
              data: {
                starBalance: { increment: payoutAmount },
              },
            });

            payoutDetails.push({
              userId: bet.userId,
              amount: payoutAmount,
            });
          }
        }
      }

      // Cập nhật trạng thái dự đoán
      const updatedPrediction = await tx.prediction.update({
        where: { id: predictionId },
        data: {
          status: "RESOLVED",
          winOption: winningOption,
          endedAt: new Date(),
        },
        include: { bets: true },
      });

      // Lấy tên lựa chọn chiến thắng
      const winLabel = winningOption === "A" ? prediction.optionA : prediction.optionB;

      // Tạo comment hệ thống công bố người thắng
      await tx.comment.create({
        data: {
          streamId: prediction.streamId,
          senderId: streamerId,
          text: `🎉 Kèo dự đoán: "${prediction.title}" đã kết thúc! Kết quả chính xác: [${winLabel}]. Sao thưởng đã được phát cho người dự đoán đúng!`,
          isGift: false,
        },
      });

      return {
        prediction: updatedPrediction,
        payouts: payoutDetails,
      };
    });

    // Publish sự kiện thời gian thực qua Redis Pub/Sub
    await redis.publish(
      `room:${result.prediction.streamId}:predictions`,
      JSON.stringify({
        type: "prediction-resolved",
        payload: {
          prediction: result.prediction,
          payouts: result.payouts,
        },
      })
    );

    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    console.error("❌ Error in POST /api/predictions/resolve:", error);
    return NextResponse.json({ error: error.message || "Lỗi hệ thống khi cập nhật kết quả!" }, { status: 500 });
  }
}
