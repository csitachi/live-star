import { NextResponse } from "next/server";
import { prisma } from "@/backend/shared/database/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const streamId = searchParams.get("streamId");

    if (!streamId) {
      return NextResponse.json({ error: "Thiếu mã phòng streamId!" }, { status: 400 });
    }

    const activePrediction = await prisma.prediction.findFirst({
      where: {
        streamId,
        status: { in: ["ACTIVE", "LOCKED"] },
      },
      include: {
        bets: true,
      },
    });

    return NextResponse.json({ success: true, prediction: activePrediction });
  } catch (error: any) {
    console.error("❌ Error in GET /api/predictions/active:", error);
    return NextResponse.json({ error: error.message || "Lỗi hệ thống khi lấy thông tin dự đoán!" }, { status: 500 });
  }
}
