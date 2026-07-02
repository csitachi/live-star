import { NextResponse } from 'next/server';
import { streamService } from '../services/stream.service';

export class StreamController {
  async getStreams(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const category = searchParams.get('category');
      
      const streams = await streamService.getStreams(category);
      return NextResponse.json(streams);
    } catch (error: any) {
      console.error('❌ Error in StreamController.getStreams:', error);
      return NextResponse.json(
        { error: error.message || 'Không thể tải danh sách stream!' },
        { status: 500 }
      );
    }
  }

  async createStream(request: Request) {
    try {
      const body = await request.json();
      const newStream = await streamService.createStream(body);
      return NextResponse.json(newStream);
    } catch (error: any) {
      console.error('❌ Error in StreamController.createStream:', error);
      const isClientError = error.message.includes('không được để trống') || 
                            error.message.includes('vượt quá') || 
                            error.message.includes('Thiếu thông tin');
      return NextResponse.json(
        { error: error.message || 'Không thể khởi tạo phòng livestream!' },
        { status: isClientError ? 400 : 500 }
      );
    }
  }

  async endStream(request: Request) {
    try {
      const body = await request.json();
      const { streamId } = body;
      
      const updatedStream = await streamService.endStream(streamId);
      return NextResponse.json(updatedStream);
    } catch (error: any) {
      console.error('❌ Error in StreamController.endStream:', error);
      const isClientError = error.message.includes('Thiếu ID');
      return NextResponse.json(
        { error: error.message || 'Không thể kết thúc phòng livestream!' },
        { status: isClientError ? 400 : 500 }
      );
    }
  }
}

export const streamController = new StreamController();
