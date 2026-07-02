import { NextResponse } from "next/server";
import { prisma } from "@/backend/shared/database/prisma";
import { redis } from "@/backend/shared/cache/redis";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { predictionId, userId, option, starAmount } = body;

    if (!predictionId || !userId || !option || !starAmount) {
      return NextResponse.json({ error: "Thiếu thông tin đặt cược!" }, { status: 400 });
    }

    if (option !== "A" && option !== "B") {
      return NextResponse.json({ error: "Lựa chọn không hợp lệ (chỉ được chọn A hoặc B)!" }, { status: 400 });
    }

    if (!Number.isInteger(starAmount) || starAmount <= 0) {
      return NextResponse.json({ error: "Số sao đặt cược phải là số nguyên dương!" }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      // 1. Kiểm tra kèo dự đoán
      const prediction = await tx.prediction.findUnique({
        where: { id: predictionId },
      });

      if (!prediction) {
        throw new Error("Không tìm thấy kèo dự đoán!");
      }

      if (prediction.status !== "ACTIVE") {
        throw new Error("Kèo dự đoán này đã khóa hoặc kết thúc!");
      }

      // 2. Kiểm tra người dùng
      const user = await tx.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error("Không tìm thấy người dùng!");
      }

      if (user.starBalance < starAmount) {
        throw new Error("Số dư sao của bạn không đủ để đặt cược!");
      }

      // 3. Chặn đặt cược cả hai lựa chọn (ngăn chặn hedging)
      const oppositeOption = option === "A" ? "B" : "A";
      const existingOppositeBet = await tx.predictionBet.findFirst({
        where: {
          predictionId,
          userId,
          option: oppositeOption,
        },
      });

      if (existingOppositeBet) {
        throw new Error(`Bạn đã đặt cược ở Lựa chọn [${oppositeOption}]. Không thể đặt cược cả hai bên!`);
      }

      // 4. Khấu trừ sao và cập nhật tổng cược của User
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          starBalance: { decrement: starAmount },
          starsGifted: { increment: starAmount }, // Đóng góp sao cũng giúp tăng cấp độ của viewer
        },
      });

      // 5. Cập nhật tổng sao cược của Prediction
      await tx.prediction.update({
        where: { id: predictionId },
        data: {
          totalStarsA: option === "A" ? { increment: starAmount } : undefined,
          totalStarsB: option === "B" ? { increment: starAmount } : undefined,
        },
      });

      // 6. Tạo bản ghi đặt cược
      const bet = await tx.predictionBet.create({
        data: {
          predictionId,
          userId,
          option,
          starAmount,
        },
      });

      // Lấy trạng thái kèo dự đoán mới nhất kèm danh sách cược
      const predictionWithBets = await tx.prediction.findUnique({
        where: { id: predictionId },
        include: { bets: true },
      });

      return {
        bet,
        newBalance: updatedUser.starBalance,
        prediction: predictionWithBets!,
      };
    });

    // Publish sự kiện thời gian thực qua Redis Pub/Sub
    await redis.publish(
      `room:${result.prediction.streamId}:predictions`,
      JSON.stringify({
        type: "prediction-bet",
        payload: { prediction: result.prediction },
      })
    );

    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    console.error("❌ Error in POST /api/predictions/bet:", error);
    return NextResponse.json({ error: error.message || "Lỗi hệ thống khi đặt cược!" }, { status: 500 });
  }
}
