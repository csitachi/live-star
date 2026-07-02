import { NextResponse } from 'next/server';
import { storageService } from '@/backend/services/storage.service';

/**
 * Local Upload Mock API
 * 
 * Endpoint nhận tệp tải lên dưới dạng request body binary stream
 * và lưu trực tiếp vào thư mục `/public/uploads` ở môi trường dev.
 */
export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json(
        { error: 'Thiếu tham số filename!' },
        { status: 400 }
      );
    }

    // Đọc body dưới dạng ArrayBuffer
    const arrayBuffer = await request.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Kích thước tối đa cho phép ở local: 50MB
    if (buffer.length > 50 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Tệp tải lên vượt quá giới hạn 50MB!' },
        { status: 413 }
      );
    }

    const fileUrl = await storageService.saveLocalFile(buffer, filename);

    return NextResponse.json({
      success: true,
      message: 'Upload tệp thành công!',
      url: fileUrl,
    });
  } catch (error: any) {
    console.error('❌ [Local Upload API] Lỗi:', error.message);
    return NextResponse.json(
      { error: 'Tải tệp lên thất bại!' },
      { status: 500 }
    );
  }
}
