import { streamController } from '@/backend/controllers/stream.controller';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  return streamController.getStreams(request);
}

export async function POST(request: Request) {
  return streamController.createStream(request);
}

export async function PUT(request: Request) {
  return streamController.endStream(request);
}
