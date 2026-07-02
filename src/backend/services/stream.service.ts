import { prisma } from '@/lib/prisma';

export class StreamService {
  async getStreams(category?: string | null) {
    const whereClause: any = {};
    if (category && category !== 'Tất cả') {
      whereClause.category = category;
    }

    const streams = await prisma.stream.findMany({
      where: whereClause,
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
      },
    });

    return streams.sort((a, b) => {
      if (a.status === 'LIVE' && b.status !== 'LIVE') return -1;
      if (a.status !== 'LIVE' && b.status === 'LIVE') return 1;
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }

  async createStream(data: {
    title: string;
    description?: string;
    streamerId: string;
    category?: string;
  }) {
    const { title, description, streamerId, category } = data;

    if (!title || title.trim().length === 0) {
      throw new Error('Tiêu đề livestream không được để trống!');
    }
    if (title.length > 100) {
      throw new Error('Tiêu đề không được vượt quá 100 ký tự!');
    }
    if (!streamerId) {
      throw new Error('Thiếu thông tin Streamer ID!');
    }

    // Business rule: one live stream per streamer
    await prisma.stream.updateMany({
      where: {
        streamerId,
        status: 'LIVE',
      },
      data: {
        status: 'ENDED',
        endedAt: new Date(),
      },
    });

    return prisma.stream.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        category: category || 'Talkshow',
        status: 'LIVE',
        streamerId,
        viewerCount: 0,
        totalStars: 0,
      },
      include: {
        streamer: true,
      },
    });
  }

  async endStream(streamId: string) {
    if (!streamId) {
      throw new Error('Thiếu ID phòng livestream!');
    }

    return prisma.stream.update({
      where: { id: streamId },
      data: {
        status: 'ENDED',
        endedAt: new Date(),
      },
    });
  }
}

export const streamService = new StreamService();
