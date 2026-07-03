// API Minigame Vòng Quay May Mắn (Lucky Wheel API).
// Endpoint: POST /api/games/lucky-wheel

import { NextResponse } from "next/server";
import { prisma } from "@/backend/shared/database/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "Thiếu thông tin người chơi!" },
        { status: 400 }
      );
    }

    // Chi phí quay: 50 sao
    const SPIN_COST = 50;

    // Định nghĩa danh sách các gói thưởng và tỷ lệ phần trăm trúng thưởng
    // Các phần thưởng:
    //  - 10 sao: Khó khăn (Tỷ lệ 30%)
    //  - 30 sao: Gần trúng (Tỷ lệ 30%)
    //  - 50 sao: Hòa vốn (Tỷ lệ 20%)
    //  - 100 sao: May mắn (Tỷ lệ 12%)
    //  - 200 sao: Thắng lớn (Tỷ lệ 6%)
    //  - 500 sao: Jackpot! (Tỷ lệ 2%)
    const prizes = [
      { stars: 10, probability: 0.30, label: "Chúc bạn may mắn lần sau!", index: 0 },
      { stars: 30, probability: 0.30, label: "Gần hòa vốn rồi!", index: 1 },
      { stars: 50, probability: 0.20, label: "Hòa vốn!", index: 2 },
      { stars: 100, probability: 0.12, label: "May mắn! Nhận 100 sao", index: 3 },
      { stars: 200, probability: 0.06, label: "Thắng lớn! Nhận 200 sao", index: 4 },
      { stars: 500, probability: 0.02, label: "JACKPOT! Chúc mừng bạn nổ hũ 500 sao 🎉", index: 5 }
    ];

    // Chọn ngẫu nhiên giải thưởng dựa trên xác suất
    const rand = Math.random();
    let cumulativeProbability = 0;
    let selectedPrize = prizes[0];

    for (const prize of prizes) {
      cumulativeProbability += prize.probability;
      if (rand <= cumulativeProbability) {
        selectedPrize = prize;
        break;
      }
    }

    // Thực hiện cập nhật số dư sao thông qua ACID Transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        throw new Error("Không tìm thấy thông tin người chơi!");
      }

      if (user.starBalance < SPIN_COST) {
        throw new Error("Số dư sao của bạn không đủ để chơi vòng quay may mắn! (Yêu cầu 50 sao)");
      }

      // Tính số dư mới: trừ đi SPIN_COST, cộng thêm selectedPrize.stars
      const balanceBeforeCost = user.starBalance;
      const balanceAfterCost = balanceBeforeCost - SPIN_COST;
      const balanceAfterPrize = balanceAfterCost + selectedPrize.stars;

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          starBalance: balanceAfterPrize
        }
      });

      // 1. Ghi nhận giao dịch chi phí quay
      await tx.starLedger.create({
        data: {
          userId,
          type: "LUCKY_WHEEL",
          amount: -SPIN_COST,
          balanceBefore: balanceBeforeCost,
          balanceAfter: balanceAfterCost,
          note: "Quay Vòng Quay May Mắn (Phí lượt quay)",
        }
      });

      // 2. Ghi nhận giao dịch nhận thưởng
      await tx.starLedger.create({
        data: {
          userId,
          type: "LUCKY_WHEEL",
          amount: selectedPrize.stars,
          balanceBefore: balanceAfterCost,
          balanceAfter: balanceAfterPrize,
          note: `Trúng Vòng Quay May Mắn: ${selectedPrize.label}`,
        }
      });

      return {
        newBalance: updatedUser.starBalance,
        prizeStars: selectedPrize.stars,
        prizeLabel: selectedPrize.label,
        prizeIndex: selectedPrize.index
      };
    });

    return NextResponse.json({
      success: true,
      message: "Quay thành công!",
      data: result
    });
  } catch (error: any) {
    console.error("❌ Lỗi API Lucky Wheel Transaction:", error?.message);
    return NextResponse.json(
      { error: error?.message || "Lỗi hệ thống khi quay vòng quay!" },
      { status: 400 }
    );
  }
}
