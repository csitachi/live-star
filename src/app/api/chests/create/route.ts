import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { streamId, creatorId, totalStars, totalSlots, durationSeconds = 120 } = body;

    if (!streamId || !creatorId || !totalStars || !totalSlots) {
      return NextResponse.json({ error: "Thiếu thông tin tạo rương!" }, { status: 400 });
    }

    if (!Number.isInteger(totalStars) || totalStars <= 0) {
      return NextResponse.json({ error: "Tổng số sao phải là số nguyên dương!" }, { status: 400 });
    }

    if (!Number.isInteger(totalSlots) || totalSlots <= 0) {
      return NextResponse.json({ error: "Tổng số lượt nhận phải là số nguyên dương!" }, { status: 400 });
    }

    if (totalSlots > totalStars) {
      return NextResponse.json({ error: "Số lượt nhận không thể lớn hơn tổng số sao!" }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      // 1. Kiểm tra người tạo rương
      const creator = await tx.user.findUnique({
        where: { id: creatorId },
      });

      if (!creator) {
        throw new Error("Không tìm thấy người dùng tạo rương!");
      }

      if (creator.starBalance < totalStars) {
        throw new Error("Số dư sao của bạn không đủ để thả rương quà này!");
      }

      // 2. Kiểm tra stream hoạt động
      const stream = await tx.stream.findUnique({
        where: { id: streamId },
      });

      if (!stream || stream.status !== "LIVE") {
        throw new Error("Phòng livestream không hoạt động!");
      }

      // 3. Khấu trừ sao người tạo
      await tx.user.update({
        where: { id: creatorId },
        data: {
          starBalance: { decrement: totalStars },
          starsGifted: { increment: totalStars },
        },
      });

      // 4. Tạo rương quà
      const expiresAt = new Date(Date.now() + durationSeconds * 1000);
      const chest = await tx.treasureChest.create({
        data: {
          streamId,
          creatorId,
          totalStars,
          remainingStars: totalStars,
          totalSlots,
          remainingSlots: totalSlots,
          expiresAt,
        },
      });

      // 5. Thêm bình luận hệ thống thông báo
      await tx.comment.create({
        data: {
          streamId,
          senderId: creatorId,
          text: `🎁 Đã thả Rương Quà May Mắn trị giá ${totalStars} sao!`,
          isGift: true,
          giftStars: totalStars,
        },
      });

      return chest;
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("❌ Error in POST /api/chests/create:", error);
    return NextResponse.json({ error: error.message || "Không thể tạo rương quà!" }, { status: 500 });
  }
}
