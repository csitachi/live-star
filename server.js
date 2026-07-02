// Máy chủ WebSocket (WS Gateway) thời gian thực phục vụ hệ thống Livestream.
// Chạy trên cổng 3001 độc lập để tối ưu hóa hiệu năng truyền tải thời gian thực.
// Lệnh chạy: node server.js

const { WebSocketServer, WebSocket } = require("ws");

const PORT = 3001;
const wss = new WebSocketServer({ port: PORT });

// Cấu hình Redis Pub/Sub để nhận sự kiện từ Gift Worker
const Redis = require("ioredis");
const fs = require("fs");
const path = require("path");

// Đọc file .env thủ công để lấy REDIS_URL nếu có
let redisUrl = "redis://localhost:6379";
try {
  const envPath = path.join(__dirname, ".env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    const match = envContent.match(/^REDIS_URL\s*=\s*["']?([^"'\r\n]+)["']?/m);
    if (match) {
      redisUrl = match[1];
    }
  }
} catch (e) {
  console.warn("⚠️ Không thể đọc file .env, sử dụng mặc định:", e.message);
}

const redisSub = new Redis(redisUrl);

redisSub.on("connect", () => {
  console.log("✅ [WS Redis] Kết nối thành công tới Redis Pub/Sub");
});

redisSub.on("error", (err) => {
  console.error("❌ [WS Redis] Lỗi kết nối Redis:", err.message);
});

// Lưu trữ danh sách các phòng đang livestream và các kết nối hoạt động.
// Cấu trúc: rooms[streamId] = {
//   streamer: socketInstance,
//   viewers: Map(socketId => socketInstance),
//   viewerCount: number
// }
const rooms = new Map();

// Đăng ký nhận message pattern
redisSub.psubscribe("room:*:gifts", (err, count) => {
  if (err) {
    console.error("❌ [WS Redis] Lỗi đăng ký pattern:", err.message);
  } else {
    console.log(`📡 [WS Redis] Đăng ký thành công pattern room:*:gifts`);
  }
});

redisSub.on("pmessage", (pattern, channel, message) => {
  try {
    const parts = channel.split(":");
    const streamId = parts[1];
    
    const room = rooms.get(streamId);
    if (!room) return; // Không có ai trong phòng này trên server node này
    
    const parsedData = JSON.parse(message);
    
    // Broadcast gift-batch tới tất cả clients trong phòng
    broadcastToRoom(streamId, parsedData);
  } catch (error) {
    console.error("❌ [WS Redis] Lỗi xử lý tin nhắn Pub/Sub:", error.message);
  }
});

// Trình đếm ID tự động tăng để định danh mỗi kết nối WebSocket
let socketIdCounter = 0;

console.log(`🚀 Máy chủ WebSocket thời gian thực đang chạy trên cổng ${PORT}`);

wss.on("connection", (ws) => {
  const socketId = `socket_${++socketIdCounter}`;
  ws.id = socketId;
  ws.room = null;
  ws.isStreamer = false;

  console.log(`🔌 Thiết lập kết nối mới: ${socketId}`);

  // KIẾN THỨC BẢO MẬT: BẢO VỆ MÁY CHỦ KHÔNG BỊ CRASH (DOS ATTACK)
  // Khi xử lý dữ liệu thô từ internet, nếu người dùng gửi dữ liệu không hợp lệ (không phải định dạng JSON),
  // lệnh JSON.parse(message) sẽ ném ra lỗi (exception). Nếu không dùng try-catch, toàn bộ server sẽ bị SẬP.
  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message.toString());
      const { type, payload } = data;

      switch (type) {
        case "join-room":
          handleJoinRoom(ws, payload);
          break;

        case "chat-message":
          handleChatMessage(ws, payload);
          break;

        case "gift-sent":
          handleGiftSent(ws, payload);
          break;

        // KIẾN THỨC BE: CƠ CHẾ SIGNALING CỦA WEBRTC (P2P STREAMING)
        // WebRTC cho phép truyền video trực tiếp giữa hai trình duyệt (P2P) mà không qua server.
        // Tuy nhiên, để tìm thấy nhau, họ cần trao đổi thông tin cấu hình mạng thông qua một server trung gian (Signaling Server).
        // 1. Offer: Streamer gửi cấu hình mã hóa video của mình.
        // 2. Answer: Viewer đồng ý và gửi lại cấu hình của mình.
        // 3. ICE Candidate: Thông tin về địa chỉ IP, cổng để hai bên kết nối trực tiếp.
        case "webrtc-offer":
        case "webrtc-answer":
        case "webrtc-candidate":
          relayWebRTCMessage(ws, type, payload);
          break;

        case "end-stream":
          handleEndStream(ws);
          break;

        case "goal-updated":
          handleGoalUpdated(ws, payload);
          break;

        case "chest-spawned":
          handleChestSpawned(ws, payload);
          break;

        case "chest-claimed":
          handleChestClaimed(ws, payload);
          break;

        case "pk-invite":
          handlePKInvite(ws, payload);
          break;

        case "pk-accept":
          handlePKAccept(ws, payload);
          break;

        case "pk-score-update":
          handlePKScoreUpdate(ws, payload);
          break;

        case "pk-forfeit":
          handlePKForfeit(ws, payload);
          break;

        case "pk-big-gift":
          handlePKBigGift(ws, payload);
          break;

        default:
          console.warn(`⚠️ Loại tin nhắn không được hỗ trợ: ${type}`);
      }
    } catch (error) {
      console.error(`❌ Lỗi xử lý tin nhắn từ ${socketId}:`, error.message);
      // Gửi phản hồi lỗi về client mà không làm sập server.
      ws.send(JSON.stringify({ type: "error", payload: { message: "Định dạng dữ liệu không hợp lệ" } }));
    }
  });

  ws.on("close", () => {
    console.log(`🔌 Kết nối đã đóng: ${socketId}`);
    handleDisconnect(ws);
  });
});

/**
 * Xử lý khi người dùng tham gia vào phòng Stream.
 */
function handleJoinRoom(ws, payload) {
  const { streamId, isStreamer, user } = payload;
  
  ws.room = streamId;
  ws.isStreamer = isStreamer;
  ws.user = user; // Lưu thông tin người dùng (id, username, displayName) vào socket
  ws.pkBattleId = null;       // ID trận PK đang diễn ra (nếu có)
  ws.pkOpponentStreamId = null; // Stream ID của đối thủ PK (nếu có)

  if (!rooms.has(streamId)) {
    rooms.set(streamId, {
      streamer: null,
      viewers: new Map(),
      viewerCount: 0
    });
  }

  const room = rooms.get(streamId);

  if (isStreamer) {
    room.streamer = ws;
    console.log(`🎥 Streamer [${user?.displayName}] đã làm chủ phòng: ${streamId}`);
  } else {
    room.viewers.set(ws.id, ws);
    room.viewerCount++;
    console.log(`👤 Viewer [${user?.displayName}] đã tham gia phòng: ${streamId}. Tổng người xem: ${room.viewerCount}`);
  }

  // Thông báo cập nhật số lượng người xem cho tất cả mọi người trong phòng
  broadcastToRoom(streamId, {
    type: "room-stats",
    payload: {
      viewerCount: room.viewerCount
    }
  });

  // Nếu là viewer tham gia và streamer đã có sẵn trong phòng, thông báo cho streamer biết để kích hoạt WebRTC
  if (!isStreamer && room.streamer) {
    room.streamer.send(JSON.stringify({
      type: "viewer-joined",
      payload: {
        viewerSocketId: ws.id,
        user: ws.user
      }
    }));
  }
}

/**
 * Phát tán tin nhắn chat tới toàn phòng.
 */
function handleChatMessage(ws, payload) {
  const streamId = ws.room;
  if (!streamId) return;

  // KIẾN THỨC BẢO MẬT: CHỐNG XSS (CROSS-SITE SCRIPTING) QUA CHAT
  // Streamer và viewer có thể chèn các thẻ độc hại `<script>alert('hack')</script>`.
  // Để ngăn chặn, phía Backend cần làm sạch (sanitize) hoặc phía Frontend cần hiển thị dưới dạng Text thuần (textContent / React `{text}` thay vì dangerouslySetInnerHTML).
  // Ở đây chúng tôi đảm bảo text gửi đi được làm sạch ký tự HTML cơ bản.
  const cleanText = payload.text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  broadcastToRoom(streamId, {
    type: "chat-message",
    payload: {
      id: payload.id || Math.random().toString(),
      sender: ws.user,
      text: cleanText,
      createdAt: new Date().toISOString(),
      isGift: false
    }
  });
}

/**
 * Phát tán sự kiện tặng sao tới toàn phòng để hiển thị hiệu ứng bay sao.
 */
function handleGiftSent(ws, payload) {
  const streamId = ws.room;
  if (!streamId) return;

  // Phát tín hiệu tặng sao tới toàn bộ phòng (bao gồm cả streamer và những viewer khác)
  broadcastToRoom(streamId, {
    type: "gift-broadcast",
    payload: {
      id: payload.id,
      sender: ws.user,
      starAmount: payload.starAmount,
      message: payload.message,
      createdAt: new Date().toISOString(),
      totalStars: payload.totalStars // Số sao lũy kế mới cập nhật từ DB
    }
  });
}

/**
 * Chuyển tiếp tín hiệu WebRTC (Signaling) giữa các Peer.
 */
function relayWebRTCMessage(ws, type, payload) {
  const streamId = ws.room;
  if (!streamId) return;

  const room = rooms.get(streamId);
  if (!room) return;

  if (ws.isStreamer) {
    // Nếu tin nhắn từ Streamer -> Gửi đích danh tới Viewer tương ứng (qua targetSocketId)
    const targetSocket = room.viewers.get(payload.targetSocketId);
    if (targetSocket && targetSocket.readyState === WebSocket.OPEN) {
      targetSocket.send(JSON.stringify({
        type: type,
        payload: {
          ...payload,
          senderSocketId: ws.id
        }
      }));
    }
  } else {
    // Nếu tin nhắn từ Viewer -> Gửi thẳng tới Streamer
    if (room.streamer && room.streamer.readyState === WebSocket.OPEN) {
      room.streamer.send(JSON.stringify({
        type: type,
        payload: {
          ...payload,
          senderSocketId: ws.id
        }
      }));
    }
  }
}

/**
 * Xử lý khi Streamer kết thúc luồng live.
 */
function handleEndStream(ws) {
  const streamId = ws.room;
  if (!streamId || !ws.isStreamer) return;

  console.log(`🔴 Streamer yêu cầu kết thúc phòng live: ${streamId}`);

  broadcastToRoom(streamId, {
    type: "stream-ended",
    payload: {}
  });

  rooms.delete(streamId);
}

/**
 * Xử lý khi một kết nối bị mất.
 */
function handleDisconnect(ws) {
  const streamId = ws.room;
  if (!streamId) return;

  const room = rooms.get(streamId);
  if (!room) return;

  if (ws.isStreamer) {
    console.log(`⚠️ Streamer ngắt kết nối khỏi phòng: ${streamId}`);
    
    // Nếu Streamer đang trong trận PK, broadcast forfeit sang phòng đối thủ
    if (ws.pkBattleId && ws.pkOpponentStreamId) {
      console.log(`⚠️ Streamer rời khỏi giữa trận PK (battleId: ${ws.pkBattleId}). Phát tín hiệu forfeit...`);
      const forfeitMsg = JSON.stringify({
        type: "pk-forfeit-broadcast",
        payload: {
          battleId: ws.pkBattleId,
          forfeitedByStreamId: streamId,
          forfeitedByUser: ws.user,
          reason: "DISCONNECT"
        }
      });
      // Broadcast cho cả phòng của streamer này và phòng đối thủ
      broadcastToRoom(streamId, JSON.parse(forfeitMsg));
      broadcastToRoom(ws.pkOpponentStreamId, JSON.parse(forfeitMsg));
    }

    // Thông báo cho viewer biết stream tạm ngắt hoặc kết thúc
    broadcastToRoom(streamId, {
      type: "stream-disconnected",
      payload: {}
    });
    room.streamer = null;
  } else {
    // Xóa Viewer khỏi danh sách phòng
    room.viewers.delete(ws.id);
    room.viewerCount = Math.max(0, room.viewerCount - 1);
    console.log(`👤 Viewer rời phòng: ${ws.id}. Còn lại: ${room.viewerCount}`);

    // Cập nhật lại stats
    broadcastToRoom(streamId, {
      type: "room-stats",
      payload: {
        viewerCount: room.viewerCount
      }
    });

    // Thông báo cho streamer biết viewer đã ngắt kết nối để dọn dẹp WebRTC PeerConnection tương ứng
    if (room.streamer && room.streamer.readyState === WebSocket.OPEN) {
      room.streamer.send(JSON.stringify({
        type: "viewer-left",
        payload: {
          viewerSocketId: ws.id
        }
      }));
    }
  }

  // Giải phóng phòng nếu không còn ai (Streamer và Viewers đều đã ra)
  if (!room.streamer && room.viewers.size === 0) {
    rooms.delete(streamId);
    console.log(`🗑️ Giải phóng phòng trống: ${streamId}`);
  }
}

/**
 * Hàm gửi tin nhắn tới toàn bộ clients trong phòng.
 */
function broadcastToRoom(streamId, messageObj) {
  const room = rooms.get(streamId);
  if (!room) return;

  const messageStr = JSON.stringify(messageObj);

  // Gửi tới Streamer
  if (room.streamer && room.streamer.readyState === WebSocket.OPEN) {
    room.streamer.send(messageStr);
  }

  // Gửi tới tất cả Viewers
  for (const viewerSocket of room.viewers.values()) {
    if (viewerSocket.readyState === WebSocket.OPEN) {
      viewerSocket.send(messageStr);
    }
  }
}

function handleGoalUpdated(ws, payload) {
  const streamId = ws.room;
  if (!streamId) return;
  broadcastToRoom(streamId, {
    type: "goal-broadcast",
    payload: payload
  });
}

function handleChestSpawned(ws, payload) {
  const streamId = ws.room;
  if (!streamId) return;
  broadcastToRoom(streamId, {
    type: "chest-broadcast",
    payload: payload
  });
}

function handleChestClaimed(ws, payload) {
  const streamId = ws.room;
  if (!streamId) return;
  broadcastToRoom(streamId, {
    type: "chest-claim-broadcast",
    payload: payload
  });
}

function handlePKInvite(ws, payload) {
  const { targetStreamerId, battle } = payload;
  console.log(`[PK Invite] Streamer ${ws.user?.displayName} (Room: ${ws.room}) is inviting targetStreamerId: ${targetStreamerId}`);

  let found = false;
  for (const [streamId, room] of rooms.entries()) {
    const roomStreamerId = room.streamer?.user?.id;
    console.log(` - Checking room ${streamId}: streamerId = ${roomStreamerId}, hasStreamerSocket = ${!!room.streamer}`);

    if (roomStreamerId === targetStreamerId) {
      room.streamer.send(JSON.stringify({
        type: "pk-invited",
        payload: {
          battle,
          senderStreamer: ws.user,
          senderStreamId: ws.room
        }
      }));
      console.log(` -> Found target streamer! Invite sent successfully.`);
      found = true;
      break;
    }
  }
  if (!found) {
    console.log(` -> Opponent streamer NOT found in any active room!`);
    ws.send(JSON.stringify({
      type: "pk-invite-error",
      payload: {
        error: "Idol đối thủ hiện đang không online hoặc đã ngắt kết nối WebSocket!"
      }
    }));
  }
}

function handlePKAccept(ws, payload) {
  const { battle, opponentStreamId } = payload;
  
  // Đăng ký trạng thái PK vào cả 2 socket streamer để detect khi disconnect
  ws.pkBattleId = battle.id;
  ws.pkOpponentStreamId = opponentStreamId;
  
  const opponentRoom = rooms.get(opponentStreamId);
  if (opponentRoom && opponentRoom.streamer) {
    opponentRoom.streamer.pkBattleId = battle.id;
    opponentRoom.streamer.pkOpponentStreamId = ws.room;
  }

  broadcastToRoom(ws.room, {
    type: "pk-start-broadcast",
    payload: { battle, opponentStreamId }
  });
  broadcastToRoom(opponentStreamId, {
    type: "pk-start-broadcast",
    payload: { battle, opponentStreamId: ws.room }
  });
}

function handlePKForfeit(ws, payload) {
  const { battleId } = payload;
  const streamId = ws.room;
  if (!streamId) return;

  const opponentStreamId = ws.pkOpponentStreamId;
  console.log(`🏳️ Streamer ${ws.user?.displayName} tự ý bỏ cuộc trận PK (battleId: ${battleId})`);

  const forfeitMsg = {
    type: "pk-forfeit-broadcast",
    payload: {
      battleId,
      forfeitedByStreamId: streamId,
      forfeitedByUser: ws.user,
      reason: "SURRENDER"
    }
  };

  // Broadcast cho cả 2 phòng
  broadcastToRoom(streamId, forfeitMsg);
  if (opponentStreamId) {
    broadcastToRoom(opponentStreamId, forfeitMsg);
  }

  // Xóa trạng thái PK khỏi cả 2 socket
  ws.pkBattleId = null;
  ws.pkOpponentStreamId = null;
  const opponentRoom = rooms.get(opponentStreamId);
  if (opponentRoom && opponentRoom.streamer) {
    opponentRoom.streamer.pkBattleId = null;
    opponentRoom.streamer.pkOpponentStreamId = null;
  }
}

function handlePKBigGift(ws, payload) {
  const streamId = ws.room;
  if (!streamId) return;

  const opponentStreamId = ws.pkOpponentStreamId;

  // Broadcast big gift effect cho cả phòng của streamer hiện tại và phòng đối thủ (nếu đang PK)
  broadcastToRoom(streamId, {
    type: "pk-big-gift-broadcast",
    payload
  });
  if (opponentStreamId) {
    broadcastToRoom(opponentStreamId, {
      type: "pk-big-gift-broadcast",
      payload
    });
  }
}

function handlePKScoreUpdate(ws, payload) {
  const { battleId, score1, score2, opponentStreamId } = payload;
  const msg = {
    type: "pk-score-broadcast",
    payload: { battleId, score1, score2 }
  };
  broadcastToRoom(ws.room, msg);
  if (opponentStreamId) {
    broadcastToRoom(opponentStreamId, msg);
  }
}
