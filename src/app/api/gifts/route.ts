/**
 * API Xử lý Tặng Sao — High-Concurrency Version
 * 
 * KIẾN THỨC KIẾN TRÚC: "Accept Fast, Process Async"
 * 
 * Trước (synchronous):
 *   POST /api/gifts → 7 DB ops → response ~200-500ms
 *   Khi 500 viewers tặng cùng lúc → DB bị quá tải → timeout/crash
 * 
 * Sau (async queue):
 *   POST /api/gifts → Redis rate check → Redis coin deduct → enqueue job → response ~5-15ms
 *   Worker xử lý batch DB writes async, không block HTTP request
 * 
 * Đánh đổi (trade-off):
 *   - Client nhận 202 Accepted thay vì 200 OK với kết quả đầy đủ ngay lập tức.
 *   - Balance hiển thị trên UI được cập nhật qua WebSocket event từ worker (~200-500ms sau).
 *   - Acceptable latency cho gift events trong livestream context.
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/backend/shared/database/prisma';
import {
  checkUserRateLimit,
  checkRoomRateLimit,
  deductCoinsAtomic,
  warmCoinCache,
} from '@/backend/shared/middleware/rateLimiter';
import { giftQueue } from '@/backend/shared/queue/giftQueue';
import { randomUUID } from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { streamId, senderId, starAmount, message, filterEffect, filterDuration } = body;

    // ==========================================
    // 1. VALIDATION CƠ BẢN
    // ==========================================
    if (!streamId || !senderId || !starAmount) {
      return NextResponse.json(
        { error: 'Thiếu thông tin giao dịch!' },
        { status: 400 }
      );
    }

    if (!Number.isInteger(starAmount) || starAmount <= 0) {
      return NextResponse.json(
        { error: 'Số lượng sao tặng phải là số nguyên dương lớn hơn 0!' },
        { status: 400 }
      );
    }

    if (starAmount > 100_000) {
      return NextResponse.json(
        { error: 'Số sao tặng vượt quá giới hạn cho phép!' },
        { status: 400 }
      );
    }

    // ==========================================
    // 2. RATE LIMITING (Redis, ~1ms)
    // ==========================================

    // 2a. Kiểm tra rate limit cấp user (tránh spam)
    const userAllowed = await checkUserRateLimit(senderId, streamId);
    if (!userAllowed) {
      return NextResponse.json(
        {
          error: `Bạn đang tặng quà quá nhanh! Vui lòng chờ vài giây.`,
          code: 'RATE_LIMITED',
        },
        { status: 429 } // Too Many Requests
      );
    }

    // 2b. Kiểm tra rate limit cấp room (tránh broadcast storm)
    const roomAllowed = await checkRoomRateLimit(streamId);
    if (!roomAllowed) {
      return NextResponse.json(
        {
          error: 'Phòng stream đang quá tải! Vui lòng thử lại sau.',
          code: 'ROOM_OVERLOADED',
        },
        { status: 429 }
      );
    }

    // ==========================================
    // 3. ATOMIC COIN DEDUCTION (Redis Lua, ~1ms)
    // ==========================================
    let deductResult = await deductCoinsAtomic(senderId, starAmount);

    // Cache miss: load balance từ DB rồi thử lại 1 lần
    if (!deductResult.success && deductResult.reason === 'cache_miss') {
      const user = await prisma.user.findUnique({
        where: { id: senderId },
        select: { starBalance: true },
      });

      if (!user) {
        return NextResponse.json(
          { error: 'Không tìm thấy thông tin người dùng!' },
          { status: 404 }
        );
      }

      // Warm cache và thử deduct lại
      await warmCoinCache(senderId, user.starBalance);
      deductResult = await deductCoinsAtomic(senderId, starAmount);
    }

    // Xử lý kết quả deduction
    if (!deductResult.success) {
      if (deductResult.reason === 'insufficient') {
        return NextResponse.json(
          { error: 'Số dư sao của bạn không đủ để thực hiện giao dịch này!' },
          { status: 400 }
        );
      }
      // Fallback không mong đợi
      return NextResponse.json(
        { error: 'Không thể xử lý giao dịch. Vui lòng thử lại.' },
        { status: 500 }
      );
    }

    const optimisticNewBalance = deductResult.newBalance;

    // ==========================================
    // 4. ENQUEUE JOB (Bull, ~2ms)
    // ==========================================
    // Idempotency key: đảm bảo nếu job bị retry, không bị double-charge
    const idempotencyKey = randomUUID();

    const job = await giftQueue.add(
      {
        idempotencyKey,
        streamId,
        senderId,
        starAmount,
        message: message?.trim() || undefined,
        enqueuedAt: Date.now(),
        // Phase 2: CSS Filter Effect (nếu có)
        filterEffect: filterEffect || undefined,
        filterDuration: filterDuration || undefined,
      },
      {
        // Priority: gifts lớn hơn được xử lý ưu tiên hơn
        priority: starAmount >= 100 ? 1 : 10,
      }
    );

    // ==========================================
    // 5. RETURN FAST (202 Accepted)
    // ==========================================
    // Client nhận response ngay (~5-15ms), không chờ DB.
    // Balance optimistic hiển thị tạm; WebSocket event từ worker sẽ confirm sau.
    return NextResponse.json(
      {
        success: true,
        message: 'Yêu cầu tặng sao đã được ghi nhận!',
        data: {
          jobId: job.id,
          transactionId: idempotencyKey,
          // Trả về balance dự tính (từ Redis) để UI cập nhật tức thì
          updatedSenderBalance: optimisticNewBalance,
        },
      },
      { status: 202 } // Accepted — đã nhận, đang xử lý
    );
  } catch (error: any) {
    console.error('❌ [Gift API] Lỗi:', error?.message);
    return NextResponse.json(
      { error: error?.message || 'Giao dịch tặng sao thất bại!' },
      { status: 500 }
    );
  }
}
