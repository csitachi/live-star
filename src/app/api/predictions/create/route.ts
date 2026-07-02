import { NextResponse } from "next/server";
import { prisma } from "@/backend/shared/database/prisma";
import { redis } from "@/backend/shared/cache/redis";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { streamId, streamerId, title, optionA, optionB } = body;

    if (!streamId || !streamerId || !title || !optionA || !optionB) {
      return NextResponse.json({ error: "Thiếu thông tin tạo dự đoán!" }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      // 1. Kiểm tra phòng live
      const stream = await tx.stream.findUnique({
        where: { id: streamId },
      });

      if (!stream) {
        throw new Error("Không tìm thấy phòng livestream!");
      }

      if (stream.status !== "LIVE") {
        throw new Error("Phòng livestream không hoạt động!");
      }

      // 2. Xác thực quyền Streamer
      if (stream.streamerId !== streamerId) {
        throw new Error("Bạn không có quyền tạo dự đoán trong phòng này!");
      }

      // 3. Kiểm tra xem có dự đoán nào đang diễn ra không
      const activePrediction = await tx.prediction.findFirst({
        where: {
          streamId,
          status: { in: ["ACTIVE", "LOCKED"] },
        },
      });

      if (activePrediction) {
        throw new Error("Hiện đang có một kèo dự đoán khác đang diễn ra!");
      }

      // 4. Tạo dự đoán mới
      const prediction = await tx.prediction.create({
        data: {
          streamId,
          title,
          optionA,
          optionB,
          status: "ACTIVE",
        },
      });

      // 5. Thêm bình luận hệ thống thông báo vào phòng chat
      await tx.comment.create({
        data: {
          streamId,
          senderId: streamerId,
          text: `🔮 Kèo dự đoán bắt đầu: "${title}". Lựa chọn [A]: ${optionA} | [B]: ${optionB}. Mời mọi người đặt cược!`,
          isGift: false,
        },
      });

      return prediction;
    });

    // Publish sự kiện thời gian thực qua Redis Pub/Sub
    await redis.publish(
      `room:${streamId}:predictions`,
      JSON.stringify({
        type: "prediction-created",
        payload: { prediction: result },
      })
    );

    return NextResponse.json({ success: true, prediction: result });
  } catch (error: any) {
    console.error("❌ Error in POST /api/predictions/create:", error);
    return NextResponse.json({ error: error.message || "Lỗi hệ thống khi tạo dự đoán!" }, { status: 500 });
  }
}
