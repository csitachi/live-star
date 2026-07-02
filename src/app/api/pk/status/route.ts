import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const streamerId = searchParams.get("streamerId");

    if (!streamerId) {
      return NextResponse.json({ error: "Thiếu ID Streamer!" }, { status: 400 });
    }

    const activeStream = await prisma.stream.findFirst({
      where: { streamerId: streamerId, status: "LIVE" },
    });

    if (!activeStream) {
      return NextResponse.json(null);
    }

    // Lấy thông tin trận thách đấu hoạt động (LIVE hoặc INVITING) liên quan đến stream
    const battle = await prisma.pKBattle.findFirst({
      where: {
        status: { in: ["INVITING", "LIVE"] },
        OR: [
          { streamId1: activeStream.id },
          { streamId2: activeStream.id },
        ],
      },
      include: {
        stream1: { include: { streamer: true } },
        stream2: { include: { streamer: true } },
      }
    });

    if (!battle) {
      return NextResponse.json(null);
    }

    // Nếu thời gian kết thúc của trận live đã qua, tự động kết thúc PK
    if (battle.status === "LIVE" && battle.endTime && new Date() > battle.endTime) {
      // Xác định người thắng cuộc
      let winnerId = null;
      if (battle.score1 > battle.score2) {
        winnerId = battle.stream1.streamerId;
      } else if (battle.score2 > battle.score1) {
        winnerId = battle.stream2.streamerId;
      }

      const endedBattle = await prisma.pKBattle.update({
        where: { id: battle.id },
        data: {
          status: "ENDED",
          winnerId,
        },
      });

      return NextResponse.json(endedBattle);
    }

    // Đính kèm thông tin hiển thị của đối thủ để dễ render ở FE
    const opponentStream = battle.streamId1 === activeStream.id ? battle.stream2 : battle.stream1;
    const opponent = {
      id: opponentStream.streamer.id,
      displayName: opponentStream.streamer.displayName,
      avatarUrl: opponentStream.streamer.avatarUrl,
    };

    return NextResponse.json({
      ...battle,
      opponent,
    });
  } catch (error: any) {
    console.error("❌ Error in GET /api/pk/status:", error);
    return NextResponse.json({ error: error.message || "Không thể lấy trạng thái PK!" }, { status: 500 });
  }
}
