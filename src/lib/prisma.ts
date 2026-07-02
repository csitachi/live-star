// Tệp quản lý kết nối cơ sở dữ liệu Prisma Client.
// Áp dụng mô hình Singleton để tránh cạn kiệt tài nguyên kết nối (Connection Pooling).

import { PrismaClient } from "../generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// 1. KIẾN THỨC BE: TRÁNH CẠN KIỆT KẾT NỐI (CONNECTION LEAKS) TRONG DEVELOPMENT
// Khi chạy `npm run dev`, Next.js sẽ liên tục hot-reload (tải lại mã nguồn).
// Nếu mỗi lần reload ta lại khởi tạo một `new PrismaClient()`, nó sẽ tạo ra các kết nối mới tới PostgreSQL.
// Chỉ sau vài lần lưu file, PostgreSQL sẽ báo lỗi "too many clients already".
// Giải pháp: Lưu instance của Prisma Client vào một biến toàn cục `globalThis` (chỉ tồn tại trong bộ nhớ NodeJS).
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// 2. KIẾN THỨC BẢO MẬT & ĐỘ TIN CẬY: SỬ DỤNG CONNECTION POOL (BỂ KẾT NỐI)
// Thay vì mở/đóng kết nối liên tục cho mỗi request (tốn chi phí thiết lập bắt tay SSL/TCP),
// Connection Pool giữ một số lượng kết nối nhất định mở sẵn.
// Khi cần truy vấn, ứng dụng sẽ mượn kết nối từ Pool, dùng xong thì trả lại.
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Biến môi trường DATABASE_URL chưa được cấu hình!");
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  // Trên production, Next.js chạy độc lập nên ta khởi tạo trực tiếp.
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  prisma = new PrismaClient({ adapter });
} else {
  // Trên local development, buộc tạo mới client để nhận diện schema mới của Prisma
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  globalForPrisma.prisma = new PrismaClient({ adapter });
  prisma = globalForPrisma.prisma;
}

export { prisma };
export default prisma;
