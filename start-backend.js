// Dịch vụ khởi chạy kép cho Backend của Livestream Stars
// Chạy đồng thời WebSocket Gateway (server.js) và Gift Worker (tsx src/backend/workers/index.ts)
// Thích hợp chạy trên các nền tảng Host như Koyeb/Render dưới dạng 1 Web Service duy nhất.

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 [Launcher] Bắt đầu khởi chạy các dịch vụ Backend...');

// 1. Khởi động WebSocket Gateway (Port 3001)
const wsProcess = spawn('node', [path.join(__dirname, 'server.js')], { stdio: 'inherit' });

wsProcess.on('close', (code) => {
  console.log(`🔌 [WebSocket Server] Đã dừng với mã thoát: ${code}`);
});

wsProcess.on('error', (err) => {
  console.error('❌ [WebSocket Server] Lỗi khởi động:', err);
});

// 2. Khởi động Gift Worker (Xử lý hàng đợi Bull/Redis)
const workerProcess = spawn('npx', ['tsx', path.join(__dirname, 'src/backend/workers/index.ts')], { stdio: 'inherit' });

workerProcess.on('close', (code) => {
  console.log(`📦 [Gift Worker] Đã dừng với mã thoát: ${code}`);
});

workerProcess.on('error', (err) => {
  console.error('❌ [Gift Worker] Lỗi khởi động:', err);
});

// Xử lý dừng tiến trình mượt mà khi nhận tín hiệu từ OS (SIGTERM / SIGINT)
const shutdown = () => {
  console.log('⏹️ [Launcher] Nhận tín hiệu tắt máy. Đang dừng tất cả các dịch vụ backend...');
  wsProcess.kill('SIGTERM');
  workerProcess.kill('SIGTERM');
  process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
