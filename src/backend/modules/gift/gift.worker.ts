import { giftQueue, GiftJob } from '@/backend/shared/queue/giftQueue';
import { prisma } from '@/backend/shared/database/prisma';
import { redis } from '@/backend/shared/cache/redis';
import { QuestService } from '@/backend/modules/quest/quest.service';

interface BufferedJob {
  job: any;
  resolve: (value: any) => void;
  reject: (reason: any) => void;
}

let jobBuffer: BufferedJob[] = [];
let flushTimeout: NodeJS.Timeout | null = null;
const BATCH_FLUSH_MS = parseInt(process.env.GIFT_BATCH_FLUSH_MS || '200', 10);
const MAX_BATCH_SIZE = 100;

console.log(`🚀 [Gift Worker] Khởi động Gift Worker. Flush interval: ${BATCH_FLUSH_MS}ms`);

// Bắt đầu lắng nghe và xử lý queue
giftQueue.process(async (job) => {
  return new Promise((resolve, reject) => {
    jobBuffer.push({ job, resolve, reject });
    
    // Nếu đạt kích thước tối đa, flush ngay lập tức
    if (jobBuffer.length >= MAX_BATCH_SIZE) {
      if (flushTimeout) {
        clearTimeout(flushTimeout);
        flushTimeout = null;
      }
      flushBuffer();
    } else if (!flushTimeout) {
      // Đặt hẹn giờ để flush buffer
      flushTimeout = setTimeout(() => {
        flushTimeout = null;
        flushBuffer();
      }, BATCH_FLUSH_MS);
    }
  });
});

/**
 * Xử lý buffer các jobs và ghi vào DB dưới dạng batch.
 */
async function flushBuffer() {
  const currentBatch = [...jobBuffer];
  jobBuffer = [];

  if (currentBatch.length === 0) return;

  console.log(`📦 [Gift Worker] Bắt đầu xử lý batch với ${currentBatch.length} jobs`);

  try {
    await processBatch(currentBatch);
  } catch (error: any) {
    console.error('❌ [Gift Worker] Lỗi xử lý batch, chuyển sang xử lý từng job một:', error.message);
    
    // Fallback: Xử lý từng job riêng lẻ nếu transaction của cả batch thất bại
    for (const buffered of currentBatch) {
      try {
        await processSingleJob(buffered.job.data);
        buffered.resolve({ success: true });
      } catch (singleErr: any) {
        console.error(`❌ [Gift Worker] Thất bại khi xử lý job đơn lẻ ${buffered.job.id}:`, singleErr.message);
        buffered.reject(singleErr);
      }
    }
  }
}

/**
 * Xử lý hàng loạt các jobs trong một Prisma Transaction.
 */
async function processBatch(bufferedJobs: BufferedJob[]) {
  const jobs = bufferedJobs.map(bj => bj.job.data as GiftJob);

  // 1. Loại bỏ các giao dịch đã tồn tại (chống trùng lặp/idempotency)
  const ids = jobs.map(j => j.idempotencyKey);
  const existingTx = await prisma.giftTransaction.findMany({
    where: { id: { in: ids } },
    select: { id: true }
  });
  const existingIds = new Set(existingTx.map(t => t.id));
  const newJobs = jobs.filter(j => !existingIds.has(j.idempotencyKey));

  if (newJobs.length === 0) {
    bufferedJobs.forEach(bj => bj.resolve({ success: true, duplicated: true }));
    return;
  }

  // 2. Thu thập dữ liệu người dùng (senders)
  const senderIds = Array.from(new Set(newJobs.map(j => j.senderId)));
  const senders = await prisma.user.findMany({
    where: { id: { in: senderIds } },
    select: { id: true, username: true, displayName: true, avatarUrl: true }
  });
  const senderMap = new Map(senders.map(u => [u.id, u]));

  // 3. Thu thập thông tin phòng stream và streamer
  const streamIds = Array.from(new Set(newJobs.map(j => j.streamId)));
  const streams = await prisma.stream.findMany({
    where: { id: { in: streamIds } },
    select: { id: true, streamerId: true }
  });
  const streamToStreamer = new Map(streams.map(s => [s.id, s.streamerId]));

  // 4. Gom nhóm tích lũy (Aggregation) để tối ưu hóa số lượng câu lệnh update DB
  const senderBalanceChanges = new Map<string, number>(); // senderId -> total stars spent
  const streamerBalanceChanges = new Map<string, number>(); // streamerId -> total stars earned
  const streamStarsChanges = new Map<string, number>(); // streamId -> total stars received

  for (const job of newJobs) {
    const streamerId = streamToStreamer.get(job.streamId);
    if (!streamerId) continue;

    senderBalanceChanges.set(
      job.senderId,
      (senderBalanceChanges.get(job.senderId) || 0) + job.starAmount
    );
    streamerBalanceChanges.set(
      streamerId,
      (streamerBalanceChanges.get(streamerId) || 0) + job.starAmount
    );
    streamStarsChanges.set(
      job.streamId,
      (streamStarsChanges.get(job.streamId) || 0) + job.starAmount
    );
  }

  // 5. Thực hiện transaction ghi dữ liệu hàng loạt
  await prisma.$transaction(async (tx) => {
    // A. Trừ sao của người gửi
    for (const [senderId, amount] of senderBalanceChanges.entries()) {
      await tx.user.update({
        where: { id: senderId },
        data: {
          starBalance: { decrement: amount },
          starsGifted: { increment: amount },
        },
      });

      // Tích lũy tiến trình nhiệm vụ tặng quà (GIFT_1)
      try {
        await QuestService.incrementProgress(senderId, "GIFT_1", 1, tx);
      } catch (err) {
        console.error(`❌ [Gift Worker] Lỗi khi cập nhật nhiệm vụ GIFT_1 cho user ${senderId}:`, err);
      }
    }

    // B. Cộng sao cho streamers
    for (const [streamerId, amount] of streamerBalanceChanges.entries()) {
      await tx.user.update({
        where: { id: streamerId },
        data: {
          starBalance: { increment: amount },
          starsEarned: { increment: amount },
        },
      });
    }

    // C. Cộng sao tích lũy vào phiên Stream
    for (const [streamId, amount] of streamStarsChanges.entries()) {
      await tx.stream.update({
        where: { id: streamId },
        data: {
          totalStars: { increment: amount },
        },
      });
    }

    // D. Cập nhật các mục tiêu (StreamGoal) ACTIVE
    const activeGoals = await tx.streamGoal.findMany({
      where: {
        streamId: { in: streamIds },
        status: 'ACTIVE',
      },
    });

    for (const goal of activeGoals) {
      const incrementAmount = streamStarsChanges.get(goal.streamId) || 0;
      if (incrementAmount > 0) {
        const updatedGoal = await tx.streamGoal.update({
          where: { id: goal.id },
          data: {
            currentStars: { increment: incrementAmount },
          },
        });
        
        if (updatedGoal.currentStars >= updatedGoal.targetStars) {
          await tx.streamGoal.update({
            where: { id: goal.id },
            data: { status: 'ACHIEVED' },
          });
        }
      }
    }

    // E. Cập nhật các PK battles ACTIVE
    const activeBattles = await tx.pKBattle.findMany({
      where: {
        status: 'LIVE',
        OR: [
          { streamId1: { in: streamIds } },
          { streamId2: { in: streamIds } },
        ],
      },
    });

    for (const battle of activeBattles) {
      const inc1 = streamStarsChanges.get(battle.streamId1) || 0;
      const inc2 = streamStarsChanges.get(battle.streamId2) || 0;
      if (inc1 > 0 || inc2 > 0) {
        await tx.pKBattle.update({
          where: { id: battle.id },
          data: {
            score1: { increment: inc1 },
            score2: { increment: inc2 },
          },
        });
      }
    }

    // F. Ghi nhận lịch sử giao dịch tặng quà bằng createMany
    const txData = newJobs
      .filter(j => streamToStreamer.has(j.streamId))
      .map(j => ({
        id: j.idempotencyKey,
        streamId: j.streamId,
        senderId: j.senderId,
        receiverId: streamToStreamer.get(j.streamId)!,
        starAmount: j.starAmount,
        message: j.message || null,
        createdAt: new Date(j.enqueuedAt),
      }));

    await tx.giftTransaction.createMany({
      data: txData,
    });

    // G. Tạo bình luận đặc biệt trong chat bằng createMany
    const commentData = newJobs.map(j => ({
      streamId: j.streamId,
      senderId: j.senderId,
      text: j.message 
        ? `Đã tặng ${j.starAmount} sao! 🌟 "${j.message}"` 
        : `Đã tặng ${j.starAmount} sao! 🌟`,
      isGift: true,
      giftStars: j.starAmount,
      createdAt: new Date(j.enqueuedAt),
    }));

    await tx.comment.createMany({
      data: commentData,
    });
  });

  // H. Cập nhật Redis cache cho các streamer nhận được sao
  for (const [streamerId, amount] of streamerBalanceChanges.entries()) {
    const key = `gift:coins:${streamerId}`;
    const exists = await redis.exists(key);
    if (exists) {
      await redis.incrby(key, amount);
    }
  }

  // 6. Truy vấn trạng thái mới nhất sau transaction để phát tán qua WS
  const updatedStreams = await prisma.stream.findMany({
    where: { id: { in: streamIds } },
    include: {
      goals: { where: { status: 'ACTIVE' } },
    },
  });

  const updatedBattles = await prisma.pKBattle.findMany({
    where: {
      status: 'LIVE',
      OR: [
        { streamId1: { in: streamIds } },
        { streamId2: { in: streamIds } },
      ],
    },
  });

  // 7. Phát sự kiện batch cho từng phòng qua Redis Pub/Sub
  for (const streamId of streamIds) {
    const streamGifts = newJobs.filter(j => j.streamId === streamId);
    if (streamGifts.length === 0) continue;

    const streamInfo = updatedStreams.find(s => s.id === streamId);
    const activeGoal = streamInfo?.goals?.[0] || null;
    const activeBattle = updatedBattles.find(
      b => b.streamId1 === streamId || b.streamId2 === streamId
    ) || null;

    const wsPayload = {
      type: 'gift-batch',
      payload: {
        gifts: streamGifts.map(g => ({
          id: g.idempotencyKey,
          sender: senderMap.get(g.senderId) || {
            id: g.senderId,
            username: 'viewer',
            displayName: 'Viewer',
            avatarUrl: '/avatars/default.png',
          },
          starAmount: g.starAmount,
          message: g.message || '',
          createdAt: new Date(g.enqueuedAt).toISOString(),
        })),
        totalStars: streamInfo?.totalStars || 0,
        activeGoal: activeGoal ? {
          id: activeGoal.id,
          title: activeGoal.title,
          targetStars: activeGoal.targetStars,
          currentStars: activeGoal.currentStars,
          status: activeGoal.status,
        } : null,
        pkBattle: activeBattle ? {
          id: activeBattle.id,
          score1: activeBattle.score1,
          score2: activeBattle.score2,
        } : null,
      },
    };

    // Publish lên Redis channel để server.js nhận và phát đi
    await redis.publish(`room:${streamId}:gifts`, JSON.stringify(wsPayload));
    console.log(`📢 [Gift Worker] Đã publish batch ${streamGifts.length} gifts cho phòng ${streamId}`);

    // Phase 2: Nếu có filter gift, publish event filter-activate riêng cho phòng này
    const filterGifts = streamGifts.filter(g => g.filterEffect);
    for (const fg of filterGifts) {
      const filterPayload = {
        type: 'filter-activate',
        payload: {
          filter: fg.filterEffect,
          duration: (fg.filterDuration || 15) * 1000, // chuyển sang ms
          triggeredBy: senderMap.get(fg.senderId) || { displayName: 'Viewer' },
          starAmount: fg.starAmount,
        },
      };
      await redis.publish(`room:${streamId}:filters`, JSON.stringify(filterPayload));
      console.log(`🎨 [Gift Worker] Đã publish filter-activate (${fg.filterEffect}) cho phòng ${streamId}`);
    }
  }

  // Giải phóng toàn bộ jobs trong batch này
  bufferedJobs.forEach(bj => bj.resolve({ success: true }));
}

/**
 * Xử lý fallback cho từng job riêng lẻ (đảm bảo tính toàn vẹn).
 */
async function processSingleJob(jobData: GiftJob) {
  const { idempotencyKey, streamId, senderId, starAmount, message, enqueuedAt } = jobData;

  // Kiểm tra trùng lặp
  const exists = await prisma.giftTransaction.findUnique({
    where: { id: idempotencyKey },
  });
  if (exists) return;

  const sender = await prisma.user.findUnique({ where: { id: senderId } });
  const stream = await prisma.stream.findUnique({ where: { id: streamId } });

  if (!sender || !stream) {
    throw new Error('Người gửi hoặc phòng stream không tồn tại!');
  }

  const receiverId = stream.streamerId;

  await prisma.$transaction(async (tx) => {
    // A. Trừ sao sender
    await tx.user.update({
      where: { id: senderId },
      data: {
        starBalance: { decrement: starAmount },
        starsGifted: { increment: starAmount },
      },
    });

    // Tích lũy tiến trình nhiệm vụ tặng quà (GIFT_1)
    try {
      await QuestService.incrementProgress(senderId, "GIFT_1", 1, tx);
    } catch (err) {
      console.error(`❌ [Gift Worker] Lỗi khi cập nhật nhiệm vụ GIFT_1 đơn lẻ cho user ${senderId}:`, err);
    }

    // B. Cộng sao streamer
    await tx.user.update({
      where: { id: receiverId },
      data: {
        starBalance: { increment: starAmount },
        starsEarned: { increment: starAmount },
      },
    });

    // C. Cập nhật stream
    const updatedStream = await tx.stream.update({
      where: { id: streamId },
      data: { totalStars: { increment: starAmount } },
    });

    // D. Cập nhật goal
    let goalPayload = null;
    const activeGoal = await tx.streamGoal.findFirst({
      where: { streamId, status: 'ACTIVE' },
    });

    if (activeGoal) {
      const updatedGoal = await tx.streamGoal.update({
        where: { id: activeGoal.id },
        data: { currentStars: { increment: starAmount } },
      });
      if (updatedGoal.currentStars >= updatedGoal.targetStars) {
        await tx.streamGoal.update({
          where: { id: activeGoal.id },
          data: { status: 'ACHIEVED' },
        });
      }
      goalPayload = updatedGoal;
    }

    // E. Cập nhật PK battle
    let pkPayload = null;
    const activeBattle = await tx.pKBattle.findFirst({
      where: {
        status: 'LIVE',
        OR: [{ streamId1: streamId }, { streamId2: streamId }],
      },
    });

    if (activeBattle) {
      const isStream1 = activeBattle.streamId1 === streamId;
      pkPayload = await tx.pKBattle.update({
        where: { id: activeBattle.id },
        data: {
          score1: isStream1 ? { increment: starAmount } : undefined,
          score2: !isStream1 ? { increment: starAmount } : undefined,
        },
      });
    }

    // F. Ghi lịch sử
    await tx.giftTransaction.create({
      data: {
        id: idempotencyKey,
        streamId,
        senderId,
        receiverId,
        starAmount,
        message: message || null,
        createdAt: new Date(enqueuedAt),
      },
    });

    // G. Tạo bình luận
    await tx.comment.create({
      data: {
        streamId,
        senderId,
        text: message ? `Đã tặng ${starAmount} sao! 🌟 "${message}"` : `Đã tặng ${starAmount} sao! 🌟`,
        isGift: true,
        giftStars: starAmount,
        createdAt: new Date(enqueuedAt),
      },
    });

    // H. Publish qua Redis
    const wsPayload = {
      type: 'gift-batch',
      payload: {
        gifts: [{
          id: idempotencyKey,
          sender: {
            id: sender.id,
            username: sender.username,
            displayName: sender.displayName,
            avatarUrl: sender.avatarUrl,
          },
          starAmount,
          message: message || '',
          createdAt: new Date(enqueuedAt).toISOString(),
        }],
        totalStars: updatedStream.totalStars,
        activeGoal: goalPayload ? {
          id: goalPayload.id,
          title: goalPayload.title,
          targetStars: goalPayload.targetStars,
          currentStars: goalPayload.currentStars,
          status: goalPayload.status,
        } : null,
        pkBattle: pkPayload ? {
          id: pkPayload.id,
          score1: pkPayload.score1,
          score2: pkPayload.score2,
        } : null,
      },
    };

    await redis.publish(`room:${streamId}:gifts`, JSON.stringify(wsPayload));
  });
}

// Lắng nghe các jobs thất bại hoàn toàn để thực hiện hoàn tiền trong Redis
giftQueue.on('failed', async (job, err) => {
  const { senderId, starAmount } = job.data as GiftJob;
  console.log(`⚠️ [Gift Worker] Job ${job.id} thất bại hoàn toàn. Đang hoàn lại ${starAmount} sao cho người dùng ${senderId} trong Redis...`);
  
  const key = `gift:coins:${senderId}`;
  const exists = await redis.exists(key);
  if (exists) {
    await redis.incrby(key, starAmount);
    console.log(`✅ [Gift Worker] Đã hoàn lại ${starAmount} sao cho người dùng ${senderId}`);
  }
});

