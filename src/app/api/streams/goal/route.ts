import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { streamId, goalTitle, goalTarget } = body;

    if (!streamId) {
      return NextResponse.json({ error: "Thiếu ID phòng livestream!" }, { status: 400 });
    }

    if (goalTarget !== undefined && (!Number.isInteger(goalTarget) || goalTarget < 0)) {
      return NextResponse.json({ error: "Mục tiêu sao phải là số nguyên không âm!" }, { status: 400 });
    }

    // Hủy bỏ các mục tiêu ACTIVE cũ
    await prisma.streamGoal.updateMany({
      where: { streamId, status: "ACTIVE" },
      data: { status: "CANCELLED" }
    });

    // Tạo mục tiêu mới
    const newGoal = await prisma.streamGoal.create({
      data: {
        streamId,
        title: goalTitle !== undefined ? goalTitle.trim() : "Mục tiêu chung",
        targetStars: goalTarget !== undefined ? goalTarget : 0,
        currentStars: 0,
        status: "ACTIVE"
      }
    });

    const streamInfo = await prisma.stream.findUnique({
      where: { id: streamId }
    });

    return NextResponse.json({
      ...streamInfo,
      goalTitle: newGoal.title,
      goalTarget: newGoal.targetStars,
      goalCurrent: newGoal.currentStars
    });
  } catch (error: any) {
    console.error("❌ Error in PUT /api/streams/goal:", error);
    return NextResponse.json({ error: error.message || "Không thể cập nhật mục tiêu!" }, { status: 500 });
  }
}
