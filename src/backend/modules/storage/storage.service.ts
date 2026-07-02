import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

/**
 * Storage Service — Hỗ trợ upload tệp phương tiện (ảnh, video)
 * 
 * KIẾN THỨC SCALE:
 * - Để scale hệ thống, trên Production chúng ta nên dùng Amazon S3 hoặc Cloudflare R2
 *   thông qua cơ chế Pre-signed URL (Client upload thẳng lên cloud, không đi qua server API Next.js).
 * - Ở môi trường Local Development, ta cấu hình lưu trữ trực tiếp vào thư mục `/public/uploads`
 *   để dễ dàng phát triển mà không phụ thuộc cloud credentials.
 */
export class StorageService {
  private uploadDir = path.join(process.cwd(), 'public', 'uploads');

  constructor() {
    // Đảm bảo thư mục lưu trữ local tồn tại
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  /**
   * Tạo Pre-signed URL (hoặc Local Mock URL) phục vụ việc tải tệp lên
   */
  async getUploadPresignedUrl(filename: string, fileType: string) {
    const fileExtension = path.extname(filename);
    const uniqueFilename = `${randomUUID()}${fileExtension}`;
    
    // Nếu dùng Production S3/R2 (bật khi có credentials):
    // const s3 = new S3Client({...});
    // const command = new PutObjectCommand({ Bucket: '...', Key: uniqueFilename, ContentType: fileType });
    // const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    // return { uploadUrl: url, fileUrl: `https://cdn.example.com/${uniqueFilename}` };

    // Local Mock: Client sẽ POST tệp lên endpoint upload local
    return {
      uploadUrl: `/api/posts/upload?filename=${encodeURIComponent(uniqueFilename)}`,
      fileUrl: `/uploads/${uniqueFilename}`,
      isLocalMock: true,
    };
  }

  /**
   * Xử lý lưu tệp local (phục vụ cho endpoint API upload mock)
   */
  async saveLocalFile(fileBuffer: Buffer, filename: string): Promise<string> {
    // Ngăn chặn Path Traversal Attack bằng cách chỉ lấy basename của filename
    const safeFilename = path.basename(filename);
    const filePath = path.join(this.uploadDir, safeFilename);

    await fs.promises.writeFile(filePath, fileBuffer);
    return `/uploads/${safeFilename}`;
  }

  /**
   * Xóa tệp phương tiện (khi xóa bài viết)
   */
  async deleteFile(fileUrl: string): Promise<void> {
    if (fileUrl.startsWith('/uploads/')) {
      const filename = path.basename(fileUrl);
      const filePath = path.join(this.uploadDir, filename);
      try {
        if (fs.existsSync(filePath)) {
          await fs.promises.unlink(filePath);
        }
      } catch (err: any) {
        console.error('❌ Lỗi xóa tệp local:', err.message);
      }
    }
    // Hỗ trợ xóa trên S3/R2 nếu cần:
    // else { ... }
  }
}

export const storageService = new StorageService();
export default storageService;
