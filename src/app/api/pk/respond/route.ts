import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { battleId, action, durationSeconds = 300 } = body; // default 5 minutes (300s)

    if (!battleId || !action) {
      return NextResponse.json({ error: "Thiếu thông tin phản hồi!" }, { status: 400 });
    }

    const battle = await prisma.pKBattle.findUnique({
      where: { id: battleId },
    });

    if (!battle) {
      return NextResponse.json({ error: "Không tìm thấy thông tin trận thách đấu!" }, { status: 400 });
    }

    if (battle.status !== "INVITING") {
      return NextResponse.json({ error: "Lời mời thách đấu này đã hết hiệu lực!" }, { status: 400 });
    }

    let status = "REJECTED";
    let startTime = null;
    let endTime = null;

    if (action === "ACCEPT") {
      status = "LIVE";
      startTime = new Date();
      endTime = new Date(Date.now() + durationSeconds * 1000);
    }

    const updatedBattle = await prisma.pKBattle.update({
      where: { id: battleId },
      data: {
        status,
        startTime,
        endTime,
      },
      include: {
        stream1: { include: { streamer: true } },
        stream2: { include: { streamer: true } },
      }
    });

    return NextResponse.json(updatedBattle);
  } catch (error: any) {
    console.error("❌ Error in POST /api/pk/respond:", error);
    return NextResponse.json({ error: error.message || "Không thể phản hồi PK!" }, { status: 500 });
  }
}
