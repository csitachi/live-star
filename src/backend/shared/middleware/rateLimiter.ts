/**
 * Rate Limiter & Atomic Coin Operations (Redis Lua Scripts)
 * 
 * KIẾN THỨC: Tại sao dùng Lua Script?
 * - Redis là single-threaded. Lua script chạy ATOMICALLY — không thể bị ngắt giữa chừng.
 * - Điều này giải quyết Race Condition: 2 requests đến cùng lúc sẽ không thể
 *   cùng đọc balance cũ và cùng trừ, dẫn đến double-spending.
 * - Lua script = check + decrement trong 1 atomic operation duy nhất.
 */

import { redis } from '@/backend/shared/cache/redis';

// ==========================================
// LUA SCRIPTS (chạy atomic trên Redis)
// ==========================================

/**
 * Atomic check-and-decrement coin balance.
 * 
 * Logic:
 *   - Nếu balance trong Redis = nil (chưa cache), trả về -1 (cần load từ DB)
 *   - Nếu balance < cost, trả về -2 (không đủ sao)
 *   - Nếu đủ, trừ đi và trả về balance mới
 */
const DEDUCT_COINS_SCRIPT = `
  local balance = tonumber(redis.call('GET', KEYS[1]))
  if balance == nil then
    return -1
  end
  if balance < tonumber(ARGV[1]) then
    return -2
  end
  redis.call('DECRBY', KEYS[1], ARGV[1])
  return balance - tonumber(ARGV[1])
`;

/**
 * Token bucket rate limiter per user per room.
 * 
 * Logic:
 *   - Mỗi (userId, roomId) có 1 counter với TTL.
 *   - Nếu counter vượt quá limit trong window → trả về 0 (bị throttle)
 *   - Ngược lại tăng counter và trả về 1 (được phép)
 */
const RATE_LIMIT_SCRIPT = `
  local current = redis.call('INCR', KEYS[1])
  if current == 1 then
    redis.call('PEXPIRE', KEYS[1], ARGV[2])
  end
  if current > tonumber(ARGV[1]) then
    return 0
  end
  return 1
`;

// ==========================================
// PUBLIC API
// ==========================================

const USER_RATE_LIMIT = parseInt(process.env.GIFT_RATE_LIMIT_PER_USER || '5', 10);
const WINDOW_MS = parseInt(process.env.GIFT_RATE_LIMIT_WINDOW_MS || '5000', 10);
const ROOM_RATE_LIMIT = parseInt(process.env.GIFT_ROOM_RATE_LIMIT || '1000', 10);
const ROOM_WINDOW_MS = 1000; // 1 giây cho room-level limit

/**
 * Kiểm tra rate limit cấp user (tối đa N gifts/window per user per room).
 * @returns true nếu được phép gửi, false nếu bị throttle
 */
export async function checkUserRateLimit(
  userId: string,
  roomId: string
): Promise<boolean> {
  const key = `gift:rl:user:${roomId}:${userId}`;
  const result = await redis.eval(
    RATE_LIMIT_SCRIPT,
    1,
    key,
    String(USER_RATE_LIMIT),
    String(WINDOW_MS)
  ) as number;
  return result === 1;
}

/**
 * Kiểm tra rate limit cấp room (tối đa N gifts/giây cho toàn phòng).
 * @returns true nếu phòng còn capacity, false nếu đang overloaded
 */
export async function checkRoomRateLimit(roomId: string): Promise<boolean> {
  const key = `gift:rl:room:${roomId}`;
  const result = await redis.eval(
    RATE_LIMIT_SCRIPT,
    1,
    key,
    String(ROOM_RATE_LIMIT),
    String(ROOM_WINDOW_MS)
  ) as number;
  return result === 1;
}

/**
 * Tải coin balance từ DB vào Redis cache (được gọi lần đầu).
 * TTL = 10 phút; Worker sẽ sync lại định kỳ.
 */
export async function warmCoinCache(
  userId: string,
  balance: number
): Promise<void> {
  const key = `gift:coins:${userId}`;
  // NX = chỉ set nếu chưa tồn tại (tránh ghi đè balance đang dùng)
  await redis.set(key, balance, 'EX', 600, 'NX');
}

/**
 * Atomic deduct coins từ Redis cache.
 * 
 * @returns
 *   { success: true, newBalance: N } — trừ thành công
 *   { success: false, reason: 'cache_miss' } — chưa có cache, cần load từ DB
 *   { success: false, reason: 'insufficient' } — không đủ sao
 */
export async function deductCoinsAtomic(
  userId: string,
  cost: number
): Promise<
  | { success: true; newBalance: number }
  | { success: false; reason: 'cache_miss' | 'insufficient' }
> {
  const key = `gift:coins:${userId}`;
  const result = await redis.eval(DEDUCT_COINS_SCRIPT, 1, key, String(cost)) as number;

  if (result === -1) return { success: false, reason: 'cache_miss' };
  if (result === -2) return { success: false, reason: 'insufficient' };
  return { success: true, newBalance: result };
}

/**
 * Lấy coin balance hiện tại từ Redis cache.
 * @returns balance hoặc null nếu chưa cache
 */
export async function getCachedBalance(userId: string): Promise<number | null> {
  const key = `gift:coins:${userId}`;
  const val = await redis.get(key);
  return val !== null ? parseInt(val, 10) : null;
}

/**
 * Force update Redis cache sau khi sync từ DB.
 */
export async function setCoinCache(userId: string, balance: number): Promise<void> {
  const key = `gift:coins:${userId}`;
  await redis.set(key, balance, 'EX', 600);
}
