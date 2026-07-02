// Kịch bản Seed dữ liệu mẫu cho cơ sở dữ liệu.
// Chạy bằng lệnh: npx prisma db seed (Cần cấu hình trong package.json)

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as dotenv from "dotenv";

// Tải biến môi trường từ .env
dotenv.config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL không được tìm thấy!");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🔄 Đang làm sạch dữ liệu cũ (Clean database)...");
  
  // KIẾN THỨC BE: TRÌNH TỰ XÓA DỮ LIỆU VỚI RÀNG BUỘC KHÓA NGOẠI (FOREIGN KEY)
  // Ta phải xóa các bảng phụ (Comment, GiftTransaction) trước, sau đó xóa bảng chính (Stream, User).
  // Nếu xóa User trước, database sẽ báo lỗi "violation of foreign key constraint" vì Stream/Comment vẫn trỏ tới User đó.
  await prisma.comment.deleteMany({});
  await prisma.giftTransaction.deleteMany({});
  await prisma.stream.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("✨ Đang khởi tạo dữ liệu mẫu (Seeding initial users)...");

  // 1. Tạo người dùng mẫu
  const streamerAlice = await prisma.user.create({
    data: {
      username: "alice",
      displayName: "Alice Streamer 🎥",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      starBalance: 350, // Nhận được 350 sao từ phiên live hôm qua
      starsEarned: 350,
    },
  });

  const viewerBob = await prisma.user.create({
    data: {
      username: "bob",
      displayName: "Bob Viewer 🌟",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      starBalance: 14750, // Người xem VIP (15000 - 250 tặng hôm qua)
      starsGifted: 250,
    },
  });

  const viewerCharlie = await prisma.user.create({
    data: {
      username: "charlie",
      displayName: "Charlie Fan Cứng 💎",
      avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150",
      starBalance: 4900, // 5000 - 100 tặng hôm qua
      starsGifted: 100,
    },
  });

  const viewerDave = await prisma.user.create({
    data: {
      username: "dave",
      displayName: "Dave Newbie 🥚",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      starBalance: 800,
      starsGifted: 0,
    },
  });

  console.log("📺 Đang tạo luồng phát sóng mẫu (Seeding streams)...");

  // 2. Tạo một Stream đã kết thúc trong quá khứ
  await prisma.stream.create({
    data: {
      title: "Review code & Giải đáp thắc mắc lập trình web",
      description: "Buổi stream hướng dẫn cơ bản cho người mới học backend.",
      category: "Gaming",
      status: "ENDED",
      viewerCount: 0,
      totalStars: 350,
      streamerId: streamerAlice.id,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Hôm qua
      endedAt: new Date(Date.now() - 22 * 60 * 60 * 1000),
      // Tạo sẵn giao dịch tặng sao mẫu
      gifts: {
        create: [
          {
            senderId: viewerBob.id,
            receiverId: streamerAlice.id,
            starAmount: 250,
            message: "Buổi chia sẻ rất hữu ích!",
          },
          {
            senderId: viewerCharlie.id,
            receiverId: streamerAlice.id,
            starAmount: 100,
            message: "Tặng chị sao nè!",
          }
        ]
      },
      comments: {
        create: [
          { senderId: viewerBob.id, text: "Chào chị Alice" },
          { senderId: viewerCharlie.id, text: "Hello cả nhà" },
          { senderId: viewerBob.id, text: "Tặng chị 250 sao nha!", isGift: true, giftStars: 250 },
          { senderId: viewerCharlie.id, text: "Tặng chị 100 sao", isGift: true, giftStars: 100 }
        ]
      }
    },
  });

  // 3. Tạo một Stream đang trực tiếp (LIVE) để người xem có thể tham gia
  const liveStream = await prisma.stream.create({
    data: {
      title: "🔴 Livestream thực chiến: Hệ thống tặng sao Next.js thời gian thực",
      description: "Hãy vào xem, chat trực tiếp và tặng sao trải nghiệm hiệu ứng Canvas hoành tráng nhé!",
      category: "Talkshow",
      status: "LIVE",
      viewerCount: 5, // Khởi tạo số lượng người xem giả lập
      totalStars: 0,
      streamerId: streamerAlice.id,
    },
  });

  console.log("✅ Dữ liệu mẫu đã khởi tạo thành công!");
  console.log(`➡️ Stream đang hoạt động ID: ${liveStream.id}`);
}

main()
  .catch((e) => {
    console.error("❌ Lỗi khi chạy seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    // Đóng pool kết nối để giải phóng tài nguyên NodeJS
    await pool.end();
  });
