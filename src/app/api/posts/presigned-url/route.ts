import { NextResponse } from 'next/server';
import { storageService } from '@/backend/modules/storage/storage.service';

/**
 * API Lấy Pre-signed URL để upload tệp phương tiện.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');
    const fileType = searchParams.get('fileType');

    if (!filename || !fileType) {
      return NextResponse.json(
        { error: 'Thiếu tham số filename hoặc fileType!' },
        { status: 400 }
      );
    }

    const data = await storageService.getUploadPresignedUrl(filename, fileType);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error('❌ [Presigned URL API] Lỗi:', error.message);
    return NextResponse.json(
      { error: 'Không thể tạo URL tải tệp lên!' },
      { status: 500 }
    );
  }
}
