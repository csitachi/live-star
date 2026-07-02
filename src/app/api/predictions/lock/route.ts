import { NextResponse } from "next/server";
import { prisma } from "@/backend/shared/database/prisma";
import { redis } from "@/backend/shared/cache/redis";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { predictionId, streamerId } = body;

    if (!predictionId || !streamerId) {
      return NextResponse.json({ error: "Thiếu thông tin khóa cược!" }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      // 1. Tìm kèo dự đoán
      const prediction = await tx.prediction.findUnique({
        where: { id: predictionId },
        include: { stream: true },
      });

      if (!prediction) {
        throw new Error("Không tìm thấy kèo dự đoán!");
      }

      // 2. Xác thực quyền Streamer
      if (prediction.stream.streamerId !== streamerId) {
        throw new Error("Bạn không có quyền khóa kèo dự đoán trong phòng này!");
      }

      if (prediction.status !== "ACTIVE") {
        throw new Error("Kèo dự đoán phải ở trạng thái đang mở (ACTIVE) mới có thể khóa!");
      }

      // 3. Cập nhật trạng thái thành LOCKED
      const updatedPrediction = await tx.prediction.update({
        where: { id: predictionId },
        data: {
          status: "LOCKED",
          lockedAt: new Date(),
        },
        include: { bets: true },
      });

      // 4. Thêm bình luận hệ thống thông báo khóa cược vào phòng chat
      await tx.comment.create({
        data: {
          streamId: prediction.streamId,
          senderId: streamerId,
          text: `🔒 Kèo dự đoán: "${prediction.title}" đã đóng cửa đặt cược! Đang chờ kết quả...`,
          isGift: false,
        },
      });

      return updatedPrediction;
    });

    // Publish sự kiện thời gian thực qua Redis Pub/Sub
    await redis.publish(
      `room:${result.streamId}:predictions`,
      JSON.stringify({
        type: "prediction-locked",
        payload: { prediction: result },
      })
    );

    return NextResponse.json({ success: true, prediction: result });
  } catch (error: any) {
    console.error("❌ Error in POST /api/predictions/lock:", error);
    return NextResponse.json({ error: error.message || "Lỗi hệ thống khi khóa dự đoán!" }, { status: 500 });
  }
}
