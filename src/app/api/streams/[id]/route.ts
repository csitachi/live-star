// API Lấy Chi Tiết Phòng Stream & Bảng Xếp Hạng Gifter (Stream Detail API).
// Endpoint: GET /api/streams/[id]
// Trả về thông tin phòng stream, toàn bộ bình luận cũ và danh sách top người tặng sao (Leaderboard).

import { NextResponse } from "next/server";
import { prisma } from "@/backend/shared/database/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: streamId } = await params;

    if (!streamId) {
      return NextResponse.json(
        { error: "Thiếu ID phòng livestream!" },
        { status: 400 }
      );
    }

    // 1. Lấy thông tin phòng stream kèm theo thông tin Streamer và Goals
    const stream = await prisma.stream.findUnique({
      where: { id: streamId },
      include: {
        streamer: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
            starsGifted: true,
            starsEarned: true,
          },
        },
        goals: {
          where: { status: "ACTIVE" }
        }
      },
    });

    if (!stream) {
      return NextResponse.json(
        { error: "Không tìm thấy phòng livestream này!" },
        { status: 404 }
      );
    }

    // Ghép thuộc tính goal tương thích ngược
    const activeGoal = stream.goals?.[0];
    const streamCompatible = {
      ...stream,
      goalTitle: activeGoal ? activeGoal.title : null,
      goalTarget: activeGoal ? activeGoal.targetStars : 0,
      goalCurrent: activeGoal ? activeGoal.currentStars : 0,
    };

    // 2. Lấy danh sách bình luận trong phòng (Sắp xếp theo thứ tự thời gian tăng dần để cuộn chat từ dưới lên)
    const comments = await prisma.comment.findMany({
      where: { streamId },
      orderBy: { createdAt: "asc" },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
            starsGifted: true,
            starsEarned: true,
          },
        },
      },
    });

    // 3. KIẾN THỨC BE: TRUY VẤN GOM NHÓM & TÍNH TOÁN BẢNG XẾP HẠNG (LEADERBOARD)
    // Để tìm ra top 5 người tặng sao nhiều nhất trong phòng phát này:
    //   - Ta cần lấy toàn bộ giao dịch tặng sao thuộc `streamId` này.
    //   - Gom nhóm (group by) theo `senderId` (người tặng).
    //   - Cộng tổng (sum) số sao `starAmount` của từng nhóm.
    //   - Sắp xếp giảm dần theo tổng số sao nhận được và lấy 5 bản ghi đầu tiên.
    // Prisma hỗ trợ phương thức `groupBy` rất mạnh mẽ để xử lý việc này ở tầng cơ sở dữ liệu PostgreSQL.
    const aggregatedGifts = await prisma.giftTransaction.groupBy({
      by: ["senderId"],
      where: { streamId },
      _sum: {
        starAmount: true,
      },
      orderBy: {
        _sum: {
          starAmount: "desc",
        },
      },
      take: 5,
    });

    // Sau khi có danh sách ID người gửi và tổng số sao, ta cần lấy thêm thông tin displayName, avatarUrl từ bảng User
    const leaderboard = await Promise.all(
      aggregatedGifts.map(async (gift) => {
        const user = await prisma.user.findUnique({
          where: { id: gift.senderId },
          select: {
            displayName: true,
            avatarUrl: true,
          },
        });
        return {
          senderId: gift.senderId,
          displayName: user?.displayName || "Người dùng ẩn danh",
          avatarUrl: user?.avatarUrl || "",
          totalStars: gift._sum.starAmount || 0,
        };
      })
    );

    // Trả về gói dữ liệu tổng hợp
    return NextResponse.json({
      stream: streamCompatible,
      comments,
      leaderboard,
    });
  } catch (error) {
    console.error("❌ Lỗi API Get Stream Detail:", error);
    return NextResponse.json(
      { error: "Lỗi tải thông tin chi tiết phòng stream!" },
      { status: 500 }
    );
  }
}
