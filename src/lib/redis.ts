/**
 * Redis Client Singleton (ioredis)
 * 
 * KIẾN THỨC: Tại sao dùng Singleton?
 * - Mỗi lần tạo new Redis() = mở 1 TCP connection tới Redis server.
 * - Trong Next.js, mỗi lần hot-reload sẽ re-import module → tạo thêm connection.
 * - Singleton + globalThis đảm bảo chỉ có 1 connection duy nhất tồn tại trong process.
 */

import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Dùng globalThis để tránh tạo nhiều connections khi Next.js hot-reload
declare global {
  // eslint-disable-next-line no-var
  var __redis: Redis | undefined;
}

function createRedisClient(): Redis {
  const client = new Redis(REDIS_URL, {
    // Tự động retry khi mất kết nối, tối đa 3 lần với backoff
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      if (times > 3) return null; // Dừng retry sau 3 lần
      return Math.min(times * 200, 1000); // 200ms, 400ms, 600ms
    },
    lazyConnect: false,
  });

  client.on('connect', () => {
    console.log('✅ [Redis] Kết nối thành công');
  });

  client.on('error', (err) => {
    console.error('❌ [Redis] Lỗi kết nối:', err.message);
  });

  client.on('reconnecting', () => {
    console.log('🔄 [Redis] Đang kết nối lại...');
  });

  return client;
}

// Singleton pattern: tái sử dụng instance nếu đã tồn tại
export const redis: Redis =
  globalThis.__redis ?? (globalThis.__redis = createRedisClient());

export default redis;
