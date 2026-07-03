// Kịch bản Seed dữ liệu mẫu cho cơ sở dữ liệu.
// Chạy bằng lệnh: npx prisma db seed (Cần cấu hình trong package.json)

import { PrismaClient } from "../src/generated/client";
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
  await prisma.userQuest.deleteMany({});
  await prisma.questDefinition.deleteMany({});
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

  console.log("📝 Khởi tạo cấu hình nhiệm vụ (QuestDefinitions)...");
  await prisma.questDefinition.createMany({
    data: [
      {
        questType: "CHECKIN",
        title: "Điểm danh hàng ngày",
        description: "Điểm danh mỗi ngày để nhận Sao miễn phí",
        target: 1,
        rewardStars: 10,
        isActive: true,
      },
      {
        questType: "WATCH_5",
        title: "Xem stream 5 phút",
        description: "Xem livestream liên tục trong 5 phút",
        target: 5,
        rewardStars: 20,
        isActive: true,
      },
      {
        questType: "WATCH_15",
        title: "Xem stream 15 phút",
        description: "Xem livestream liên tục trong 15 phút",
        target: 15,
        rewardStars: 50,
        isActive: true,
      },
      {
        questType: "CHAT_3",
        title: "Bình luận sôi nổi",
        description: "Gửi ít nhất 3 tin nhắn bình luận tại các phòng livestream",
        target: 3,
        rewardStars: 10,
        isActive: true,
      },
      {
        questType: "GIFT_1",
        title: "Người trao yêu thương",
        description: "Tặng ít nhất 1 Sao cho Streamer bất kỳ",
        target: 1,
        rewardStars: 30,
        isActive: true,
      },
    ],
  });

  console.log("📝 Khởi tạo các bài viết mẫu (Seeding posts, likes, and comments)...");
  
  // 1. Tạo các bài viết mẫu
  const post1 = await prisma.post.create({
    data: {
      content: "Chào mọi người! Hôm nay Alice sẽ lên sóng lúc 20h để PK cùng khách mời bí ẩn nhé 🎤. Mọi người chuẩn bị sẵn sao để tiếp lửa cho Alice nha!",
      type: "STATUS",
      authorId: streamerAlice.id,
      likesCount: 2,
      commentsCount: 2,
    }
  });

  const post2 = await prisma.post.create({
    data: {
      content: "Góc setup livestream mới của Alice! Mọi người thấy dàn đèn LED màu hồng neon này có đỉnh không nè? 💡💖",
      type: "PHOTO",
      mediaUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800",
      authorId: streamerAlice.id,
      likesCount: 3,
      commentsCount: 1,
    }
  });

  const post3 = await prisma.post.create({
    data: {
      content: "Cuối cùng cũng tậu được chiếc mic mới siêu xịn mịn để hát tặng cả nhà rồi đây! 🎙️✨ Trải nghiệm âm thanh vòm cực đã luôn.",
      type: "PHOTO",
      mediaUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
      authorId: streamerAlice.id,
      likesCount: 1,
      commentsCount: 0,
    }
  });

  const post4 = await prisma.post.create({
    data: {
      content: "Đang cày cuốc dự án website live stream này từ đêm qua, code chạy mượt mà không lỗi lầm gì. Anh em dev đâu rồi cho một cánh tay nào! 💻🚀",
      type: "PHOTO",
      mediaUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
      authorId: viewerBob.id,
      likesCount: 2,
      commentsCount: 2,
    }
  });

  const post5 = await prisma.post.create({
    data: {
      content: "Hôm nay làm viewer VIP đi dạo quanh các phòng xem PK căng thẳng quá. Mọi người thấy Idol nào PK đỉnh nhất tuần này?",
      type: "STATUS",
      authorId: viewerBob.id,
      likesCount: 1,
      commentsCount: 1,
    }
  });

  const post6 = await prisma.post.create({
    data: {
      content: "Vừa tặng 100 sao cho Alice. Giọng hát của Alice thực sự làm mình thấy thư giãn sau ngày làm việc mệt mỏi 🎶💎",
      type: "STATUS",
      authorId: viewerCharlie.id,
      likesCount: 2,
      commentsCount: 1,
    }
  });

  const post7 = await prisma.post.create({
    data: {
      content: "Có ai là newbie mới tham gia LiveStar giống mình không? Điểm danh kết bạn lướt bảng tin cùng nhau nào anh em ơi! 🥚👋",
      type: "STATUS",
      authorId: viewerDave.id,
      likesCount: 1,
      commentsCount: 3,
    }
  });

  const post8 = await prisma.post.create({
    data: {
      content: "Xem video test hiệu ứng PK cực cháy nè anh em! LiveStar đỉnh nó phải thế này chứ lị 🔥🎥",
      type: "VIDEO",
      mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      authorId: streamerAlice.id,
      likesCount: 2,
      commentsCount: 1,
    }
  });

  // 2. Tạo Likes mẫu
  await prisma.postLike.createMany({
    data: [
      { postId: post1.id, userId: viewerBob.id },
      { postId: post1.id, userId: viewerCharlie.id },
      
      { postId: post2.id, userId: viewerBob.id },
      { postId: post2.id, userId: viewerCharlie.id },
      { postId: post2.id, userId: viewerDave.id },

      { postId: post3.id, userId: viewerCharlie.id },

      { postId: post4.id, userId: streamerAlice.id },
      { postId: post4.id, userId: viewerCharlie.id },

      { postId: post5.id, userId: viewerDave.id },

      { postId: post6.id, userId: streamerAlice.id },
      { postId: post6.id, userId: viewerBob.id },

      { postId: post7.id, userId: viewerBob.id },

      { postId: post8.id, userId: viewerBob.id },
      { postId: post8.id, userId: viewerCharlie.id },
    ]
  });

  // 3. Tạo Comments mẫu
  await prisma.postComment.createMany({
    data: [
      { postId: post1.id, authorId: viewerBob.id, content: "Hóng quá chị ơi! Tối nay nhất định em sẽ vào xem sớm 😍" },
      { postId: post1.id, authorId: viewerCharlie.id, content: "Đã chuẩn bị sẵn 500 sao để tặng idol rồi nha!" },

      { postId: post2.id, authorId: viewerBob.id, content: "Đẹp quá Alice ơi, phòng sáng lung linh luôn." },

      { postId: post4.id, authorId: streamerAlice.id, content: "Xịn quá Bob ơi! Đúng chuẩn dân chuyên nghiệp rồi." },
      { postId: post4.id, authorId: viewerDave.id, content: "Nhìn dàn code mê ly thế anh ơi." },

      { postId: post5.id, authorId: viewerCharlie.id, content: "Chắc chắn là Alice rồi chứ ai nữa haha." },

      { postId: post6.id, authorId: streamerAlice.id, content: "Cảm ơn Charlie thân yêu đã ủng hộ Alice nhé! Yêu thương ngập tràn ❤️" },

      { postId: post7.id, authorId: viewerBob.id, content: "Chào mừng Dave gia nhập động LiveStar nhé!" },
      { postId: post7.id, authorId: viewerCharlie.id, content: "Newbie thì cứ nạp sao rồi đi dạo tặng idol là quen hết nha bạn ơi kkk" },
      { postId: post7.id, authorId: streamerAlice.id, content: "Hi Dave! Chúc bạn có những phút giây giải trí vui vẻ tại đây nha." },

      { postId: post8.id, authorId: viewerBob.id, content: "Hiệu ứng mượt mà và hoành tráng thật đấy!" },
    ]
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
