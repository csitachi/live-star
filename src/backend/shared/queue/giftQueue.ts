/**
 * Bull Gift Queue
 * 
 * KIẾN THỨC: Bull là job queue backed by Redis.
 * - Mỗi "job" trong queue là 1 yêu cầu tặng sao chờ được xử lý.
 * - Bull đảm bảo: persistent (không mất khi server restart), retry khi fail,
 *   concurrency control, và monitoring.
 * 
 * Luồng hoạt động:
 *   API Route → giftQueue.add(job) → Worker xử lý batch → DB write
 */

import Bull from 'bull';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

export interface GiftJob {
  idempotencyKey: string;   // UUID duy nhất để tránh double-process khi retry
  streamId: string;
  senderId: string;
  starAmount: number;
  message?: string;
  enqueuedAt: number;       // timestamp để monitor độ trễ
}

// Singleton queue instance
declare global {
  // eslint-disable-next-line no-var
  var __giftQueue: Bull.Queue<GiftJob> | undefined;
}

function createGiftQueue(): Bull.Queue<GiftJob> {
  const queue = new Bull<GiftJob>('gift-processing', REDIS_URL, {
    defaultJobOptions: {
      attempts: 3,          // Retry tối đa 3 lần nếu worker fail
      backoff: {
        type: 'exponential',
        delay: 500,         // 500ms, 1s, 2s
      },
      removeOnComplete: 100, // Giữ 100 completed jobs gần nhất để debug
      removeOnFail: 50,     // Giữ 50 failed jobs để phân tích lỗi
    },
    // Cho phép 20 jobs xử lý đồng thời trong worker
    settings: {
      maxStalledCount: 2,
    },
  });

  queue.on('error', (err) => {
    console.error('❌ [GiftQueue] Queue error:', err.message);
  });

  queue.on('failed', (job, err) => {
    console.error(`❌ [GiftQueue] Job ${job.id} failed (attempt ${job.attemptsMade}):`, err.message);
  });

  return queue;
}

export const giftQueue: Bull.Queue<GiftJob> =
  globalThis.__giftQueue ?? (globalThis.__giftQueue = createGiftQueue());

export default giftQueue;
