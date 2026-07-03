import { NextResponse } from "next/server";
import { prisma } from "@/backend/shared/database/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { chestId, userId } = body;

    if (!chestId || !userId) {
      return NextResponse.json({ error: "Thiếu thông tin nhận quà!" }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      // 1. Kiểm tra rương quà (Khóa hàng rương quà để tránh Race Condition)
      // Sử dụng raw query hoặc findUnique thông thường. Để an toàn tuyệt đối với Prisma transaction,
      // ta đọc rương quà
      const chest = await tx.treasureChest.findUnique({
        where: { id: chestId },
      });

      if (!chest) {
        throw new Error("Rương quà không tồn tại!");
      }

      if (chest.remainingSlots <= 0 || chest.remainingStars <= 0) {
        throw new Error("Rương quà đã được mở hết!");
      }

      if (new Date() < chest.expiresAt) {
        // Tùy theo luật chơi, rương có thể bắt buộc đợi đếm ngược kết thúc mới được mở.
        // Hãy ném ra lỗi nếu rương chưa đếm ngược xong.
        const timeLeft = Math.ceil((chest.expiresAt.getTime() - Date.now()) / 1000);
        if (timeLeft > 0) {
          throw new Error(`Rương quà đang đếm ngược! Vui lòng đợi ${timeLeft} giây.`);
        }
      }

      // 2. Kiểm tra xem user đã nhận quà từ rương này chưa
      const existingClaim = await tx.treasureClaim.findFirst({
        where: {
          chestId,
          userId,
        },
      });

      if (existingClaim) {
        throw new Error("Bạn đã nhận sao từ rương này rồi!");
      }

      // 3. Tính toán số sao ngẫu nhiên được nhận
      let amount = 1;
      if (chest.remainingSlots === 1) {
        // Người cuối cùng nhận toàn bộ phần còn lại
        amount = chest.remainingStars;
      } else {
        // Phân phối ngẫu nhiên (thuật toán bao lì xì đơn giản)
        // Trung bình nhân 2
        const maxClaim = Math.floor((chest.remainingStars / chest.remainingSlots) * 2);
        const limit = chest.remainingStars - chest.remainingSlots + 1;
        amount = Math.floor(Math.random() * Math.min(maxClaim, limit)) + 1;
        if (amount > limit) {
          amount = limit;
        }
      }

      // 4. Cập nhật rương quà
      const updatedChest = await tx.treasureChest.update({
        where: { id: chestId },
        data: {
          remainingStars: { decrement: amount },
          remainingSlots: { decrement: 1 },
        },
      });

      // 5. Tạo bản ghi nhận sao
      const claim = await tx.treasureClaim.create({
        data: {
          chestId,
          userId,
          amount,
        },
      });

      // 6. Cộng sao cho người nhận
      const userForClaim = await tx.user.findUnique({
        where: { id: userId },
        select: { starBalance: true }
      });
      if (!userForClaim) {
        throw new Error("Không tìm thấy thông tin người nhận!");
      }
      const balanceBefore = userForClaim.starBalance;
      const balanceAfter = balanceBefore + amount;

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          starBalance: balanceAfter,
        },
      });

      // Ghi sổ cái StarLedger cho việc giật rương
      await tx.starLedger.create({
        data: {
          userId,
          type: "CHEST_CLAIM",
          amount: amount,
          balanceBefore,
          balanceAfter,
          chestClaimId: claim.id,
          streamId: chest.streamId,
          note: `Nhận +${amount} sao từ Rương Quà May Mắn`,
        },
      });

      return {
        amount,
        remainingSlots: updatedChest.remainingSlots,
        remainingStars: updatedChest.remainingStars,
      };
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("❌ Error in POST /api/chests/claim:", error);
    return NextResponse.json({ error: error.message || "Không thể nhận sao!" }, { status: 500 });
  }
}
