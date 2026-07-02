import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { streamerId1, streamerId2 } = body;

    if (!streamerId1 || !streamerId2) {
      return NextResponse.json({ error: "Thiếu thông tin người thách đấu!" }, { status: 400 });
    }

    if (streamerId1 === streamerId2) {
      return NextResponse.json({ error: "Bạn không thể thách đấu chính mình!" }, { status: 400 });
    }

    // Tìm stream đang LIVE của streamerId1 và streamerId2
    const stream1 = await prisma.stream.findFirst({
      where: { streamerId: streamerId1, status: "LIVE" }
    });
    const stream2 = await prisma.stream.findFirst({
      where: { streamerId: streamerId2, status: "LIVE" }
    });

    if (!stream1 || !stream2) {
      return NextResponse.json({ error: "Một trong hai Idol không có phiên live hoạt động!" }, { status: 400 });
    }

    // Kiểm tra xem có trận PK nào đang diễn ra của 1 trong 2 stream không
    const activeBattle = await prisma.pKBattle.findFirst({
      where: {
        OR: [
          { streamId1: stream1.id, status: { in: ["INVITING", "LIVE"] } },
          { streamId2: stream1.id, status: { in: ["INVITING", "LIVE"] } },
          { streamId1: stream2.id, status: { in: ["INVITING", "LIVE"] } },
          { streamId2: stream2.id, status: { in: ["INVITING", "LIVE"] } },
        ]
      }
    });

    if (activeBattle) {
      return NextResponse.json({ error: "Một trong hai Idol đang có trận PK hoặc lời mời hoạt động!" }, { status: 400 });
    }

    // Tạo trận PK Battle mới ở trạng thái INVITING
    const battle = await prisma.pKBattle.create({
      data: {
        streamId1: stream1.id,
        streamId2: stream2.id,
        status: "INVITING",
        score1: 0,
        score2: 0,
      },
      include: {
        stream1: { include: { streamer: true } },
        stream2: { include: { streamer: true } },
      }
    });

    return NextResponse.json(battle);
  } catch (error: any) {
    console.error("❌ Error in POST /api/pk/invite:", error);
    return NextResponse.json({ error: error.message || "Không thể gửi lời mời PK!" }, { status: 500 });
  }
}
