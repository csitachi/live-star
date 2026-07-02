// API Xử lý khi một streamer bỏ cuộc (forfeit) giữa chừng trận PK Battle
// Endpoint: PUT /api/pk/forfeit
// Body: { battleId: string, forfeiterId: string } 

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { battleId, forfeiterId } = body;

    if (!battleId || !forfeiterId) {
      return NextResponse.json({ error: "Thiếu thông tin để kết thúc trận đấu!" }, { status: 400 });
    }

    // Tìm battle đang LIVE
    const battle = await prisma.pKBattle.findUnique({
      where: { id: battleId },
      include: {
        stream1: { include: { streamer: true } },
        stream2: { include: { streamer: true } },
      }
    });

    if (!battle) {
      return NextResponse.json({ error: "Không tìm thấy trận đấu PK!" }, { status: 404 });
    }

    if (battle.status !== "LIVE") {
      return NextResponse.json({ error: "Trận đấu không ở trạng thái LIVE!" }, { status: 400 });
    }

    // Xác định bên thua (forfeit) và bên thắng
    const forfeiterIsStream1 = battle.stream1.streamerId === forfeiterId;
    const winnerId = forfeiterIsStream1 ? battle.stream2.streamerId : battle.stream1.streamerId;

    const updatedBattle = await prisma.pKBattle.update({
      where: { id: battleId },
      data: {
        status: "ENDED",
        endTime: new Date(),
        winnerId,
      },
      include: {
        stream1: { include: { streamer: true } },
        stream2: { include: { streamer: true } },
      }
    });

    return NextResponse.json({ 
      battle: updatedBattle,
      forfeitedBy: forfeiterId,
      winnerId,
      reason: "FORFEIT"
    });
  } catch (error: any) {
    console.error("❌ Error in PUT /api/pk/forfeit:", error);
    return NextResponse.json({ error: error.message || "Không thể xử lý bỏ cuộc PK!" }, { status: 500 });
  }
}
