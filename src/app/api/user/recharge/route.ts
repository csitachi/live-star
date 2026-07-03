// API Nạp Sao Giả Lập (Recharge Star API).
// Phục vụ tính năng trải nghiệm mua thêm sao để tặng quà mà không cần tích hợp cổng thanh toán thực tế.

import { NextResponse } from "next/server";
import { prisma } from "@/backend/shared/database/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, amount } = body;

    // KIỂM TRA ĐẦU VÀO (INPUT VALIDATION)
    if (!userId || !amount) {
      return NextResponse.json(
        { error: "Thiếu thông tin nạp sao!" },
        { status: 400 }
      );
    }

    // Bảo mật: Kiểm tra số tiền nạp phải hợp lệ (số nguyên dương) để tránh việc người dùng truyền số âm
    // nhằm mục đích tự trừ sao của chính mình trái phép hoặc gây lỗi dữ liệu.
    if (!Number.isInteger(amount) || amount <= 0) {
      return NextResponse.json(
        { error: "Số lượng sao nạp phải là số nguyên dương lớn hơn 0!" },
        { status: 400 }
      );
    }

    // Giới hạn số lượng sao tối đa mỗi lần nạp để tránh tràn số (Integer Overflow) trong database.
    // Trường Int thông thường trong SQL tối đa là ~2.14 tỷ. Nếu nạp quá lớn có thể gây lỗi.
    if (amount > 100000) {
      return NextResponse.json(
        { error: "Mỗi lần nạp tối đa là 100,000 sao!" },
        { status: 400 }
      );
    }

    // Thực hiện cộng sao và ghi sổ cái trong một Prisma Transaction để đảm bảo tính toàn vẹn
    const updatedUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { starBalance: true }
      });
      if (!user) {
        throw new Error("Người dùng không tồn tại!");
      }

      const balanceBefore = user.starBalance;
      const balanceAfter = balanceBefore + amount;

      const updated = await tx.user.update({
        where: { id: userId },
        data: {
          starBalance: balanceAfter,
        },
      });

      await tx.starLedger.create({
        data: {
          userId,
          type: "RECHARGE",
          amount: amount,
          balanceBefore,
          balanceAfter,
          note: `Nạp thành công +${amount.toLocaleString()} sao (thử nghiệm)`,
        },
      });

      return updated;
    });

    console.log(`💰 Người dùng [${updatedUser.displayName}] vừa nạp thành công +${amount} sao. Số dư mới: ${updatedUser.starBalance}`);

    return NextResponse.json({
      success: true,
      message: `Nạp thành công ${amount} sao!`,
      starBalance: updatedUser.starBalance,
    });
  } catch (error) {
    console.error("❌ Lỗi API Post Recharge:", error);
    return NextResponse.json(
      { error: "Không thể nạp sao vào tài khoản!" },
      { status: 500 }
    );
  }
}
