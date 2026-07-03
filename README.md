# 🌟 Livestream Stars - Nền tảng Livestream & Tương tác Thời gian thực

Chào mừng bạn đến với dự án **Livestream Stars (LiveStar)**! Đây là một nền tảng Web Livestream giải trí hiện đại được tối ưu hóa cho hiệu năng cao và tương tác thời gian thực. Hệ thống tích hợp các tính năng livestream trực tuyến qua WebRTC, cơ chế tặng sao (gifting) chịu tải cao, trò chơi dự đoán (predictions), lì xì giật rương báu (treasure chest), các trận đấu PK Battle rực lửa giữa các Idol, cùng với hệ thống nhiệm vụ hàng ngày (daily quests) và bảng tin mạng xã hội cá nhân.

Tài liệu này được viết chi tiết nhằm giúp các lập trình viên mới gia nhập dự án có thể nắm bắt nhanh chóng kiến trúc hệ thống, cài đặt môi trường và bắt đầu phát triển mã nguồn một cách dễ dàng.

---

## 🗺️ Bản đồ Tính năng (Features)

Hệ thống LiveStar bao gồm hai phân hệ chính dành cho **Viewer (Người xem)** và **Streamer/KOL (Nhà sáng tạo nội dung)**:

### 1. Phân hệ Livestream & WebRTC
*   **Streamer Live Room**: Streamer thiết lập phòng live (chọn danh mục như Talkshow, Music, Gaming, Comedy), cấp quyền camera/micro và phát sóng trực tiếp.
*   **WebRTC P2P Video Streaming**: Truyền phát hình ảnh và âm thanh trực tiếp từ Streamer đến Viewer thông qua giao thức WebRTC (Signaling Server trung gian tích hợp trong WebSocket Gateway), giảm độ trễ xuống dưới 1 giây.
*   **Realtime Viewers Count & VIP Entry**: Đồng bộ số lượng người xem trực tiếp. Khi người dùng VIP (đã tặng trên 100 sao) tham gia phòng, hệ thống sẽ phát tín hiệu chào mừng đặc biệt nổi bật trên khung chat.

### 2. Hệ thống Tặng quà Hiệu năng cao (High-Concurrency Gifting)
*   **Tặng sao tương tác**: Viewer có thể tặng sao kèm lời nhắn cho Streamer để khích lệ.
*   **Hiệu ứng Bay sao Canvas**: Phía Client sử dụng HTML5 Canvas vẽ hiệu ứng hoạt họa bay sao thời gian thực mượt mà mà không làm giật lag giao diện.
*   **Thiết kế Chống nghẽn (Accept Fast, Process Async)**:
    *   Sử dụng **Redis Lua Script** để kiểm tra và trừ sao của User trong 1ms (Atomic Operation), loại bỏ hoàn toàn lỗi Double-Spending (chi tiêu kép) khi có hàng ngàn yêu cầu cùng lúc.
    *   Đẩy giao dịch vào hàng đợi **Bull Queue**.
    *   **Worker** chạy ngầm gom các giao dịch lại và ghi vào Database PostgreSQL theo lô (**Batch Write** trong một Transaction duy nhất) để giảm tải cho DB.

### 3. Đấu PK Battle (Player vs Player)
*   Hai Streamer đang live có thể thách đấu PK trực tiếp với nhau.
*   Hệ thống đồng bộ điểm số PK thời gian thực dựa trên số lượng sao mà người hâm mộ của mỗi bên tặng.
*   Đếm ngược thời gian thi đấu, tự động phân định thắng thua khi hết giờ hoặc khi có một bên bỏ cuộc (Forfeit).

### 4. Rương kho báu (Treasure Chest - Lì xì)
*   Streamer hoặc Viewer VIP có thể ném một rương báu (lì xì sao) vào phòng livestream với số sao và số lượt nhận giới hạn.
*   Viewer trong phòng click nhanh tay để giật sao ngẫu nhiên (Treasure Claim) từ rương trước khi hết lượt hoặc hết giờ.

### 5. Dự đoán (Predictions - Mini-game)
*   Streamer tạo câu hỏi dự đoán với 2 lựa chọn A hoặc B (ví dụ: *"Trận đấu này Alice có thắng không?"*).
*   Viewer đặt cược số sao của mình vào lựa chọn mong muốn. Hệ thống khóa đặt cược và khi Streamer công bố kết quả, sao thưởng sẽ được tự động chia đều cho những người đoán đúng theo tỷ lệ cược.

### 6. Nhiệm vụ hàng ngày (Daily Quests)
*   Bảng nhiệm vụ phong phú bao gồm: Điểm danh (CHECKIN), Xem livestream (WATCH_5, WATCH_15), Nhắn tin (CHAT_3), và Tặng sao (GIFT_1).
*   Hệ thống tự động theo dõi và cập nhật tiến trình làm nhiệm vụ của từng User theo ngày (YYYY-MM-DD), cho phép nhận thưởng sao trực tiếp vào ví.

### 7. Bảng tin Mạng xã hội (Social Feed)
*   Trang cá nhân cho phép đăng bài viết (Status, ảnh, video), thả tim (Post Like) và bình luận (Post Comment) để tăng tính kết nối giữa Idol và fan hâm mộ khi không lên sóng.

---

## 🏗️ Kiến trúc Hệ thống (System Architecture)

Dự án áp dụng mô hình kiến trúc phân rã thành **3 thành phần hoạt động song song** nhằm đảm bảo khả năng chịu tải tốt và phản hồi thời gian thực:

```mermaid
sequenceDiagram
    autonumber
    actor Viewer as Người xem (Viewer)
    participant UI as Giao diện (Next.js Client)
    participant API as API Server (Next.js Route)
    participant Redis as Bộ nhớ đệm (Redis)
    participant Queue as Hàng đợi (Bull Queue)
    participant Worker as Worker xử lý ngầm
    participant DB as Cơ sở dữ liệu (PostgreSQL)
    participant WS as WebSocket Gateway

    Viewer->>UI: Nhấp nút Tặng Sao (ví dụ: 100 sao)
    UI->>API: POST /api/gifts (Payload giao dịch)
    Note over API,Redis: Thực hiện Rate Limiting & Trừ sao Atomic
    API->>Redis: Chạy Lua Script check-and-deduct balance
    alt Sao không đủ hoặc quá tải
        Redis-->>API: Trả về mã lỗi (-1 hoặc -2)
        API-->>UI: Response 400 Bad Request / 429 Too Many Requests
    else Trừ sao thành công trong Redis
        Redis-->>API: Trả về số dư mới (Optimistic Balance)
        API->>Queue: Đẩy Job tặng sao vào hàng đợi Bull
        API-->>UI: Response 202 Accepted (Kèm số dư dự tính)
        UI-->>Viewer: Cập nhật số dư trên UI ngay lập tức (~10ms)
    end

    Note over Worker,DB: Xử lý ghi DB theo lô (Batch Processing)
    Queue->>Worker: Lấy các job tặng sao ra khỏi hàng đợi
    Worker->>Worker: Gom nhóm (Aggregate) các jobs trong 200ms
    Worker->>DB: Thực hiện ghi lô (Prisma $transaction ghi nhận GiftTransaction, cập nhật User, Stream, PK, Quest)
    DB-->>Worker: Lưu dữ liệu thành công
    Worker->>Redis: Đồng bộ lại ví sao trong Redis cache (nếu cần)
    Worker->>Redis: Publish sự kiện 'gift-batch' vào channel room:streamId:gifts
    Redis->>WS: WebSocket Gateway nhận sự kiện từ Redis Pub/Sub
    WS->>UI: Broadcast sự kiện tới tất cả người xem trong phòng qua WebSocket
    UI-->>Viewer: Hiển thị hiệu ứng bay sao Canvas & xác nhận số dư thực tế
```

### Các thành phần chính trong hệ thống:
1.  **Next.js Web Client (Port 3000)**: Chạy ứng dụng Next.js, đóng vai trò hiển thị giao diện người dùng và cung cấp các API endpoints nghiệp vụ (như đăng nhập, tạo stream, ném rương, đặt cược).
2.  **WebSocket Gateway (Port 3001)**: Máy chủ WebSocket độc lập (`server.js` thuần Node.js) chịu trách nhiệm duy trì kết nối thời gian thực với hàng ngàn clients cùng lúc. Nó điều phối chat, phát tín hiệu WebRTC (Signaling) và lắng nghe Redis Pub/Sub để phát tán sự kiện từ worker đến phòng stream tương ứng.
3.  **Bull Queue & Background Workers (Process riêng)**: Lắng nghe hàng đợi `gift-processing` để thực hiện xử lý bất đồng bộ các giao dịch tặng sao, tương tác ghi cơ sở dữ liệu hàng loạt nhằm giảm thiểu I/O blocking cho API chính.

---

## 🗄️ Thiết kế Cơ sở dữ liệu (Database Schema)

Dự án sử dụng thư viện **Prisma ORM** để tương tác với cơ sở dữ liệu **PostgreSQL**. Dưới đây là các bảng quan trọng định nghĩa trong schema:

*   **User**: Lưu trữ thông tin tài khoản người dùng, phân quyền (`UserRole`: `VIEWER`, `STREAMER`, `ADMIN`), số dư sao hiện tại (`starBalance`), tổng số sao đã tặng/nhận.
*   **Stream**: Lưu thông tin phòng live bao gồm tiêu đề, danh mục, trạng thái (`LIVE`/`ENDED`), bộ đếm người xem và tổng sao tích lũy.
*   **GiftTransaction**: Lưu chi tiết lịch sử mỗi lần tặng quà bao gồm người gửi, người nhận, số sao và tin nhắn kèm theo.
*   **Comment**: Lưu các tin nhắn chat trong phòng live (cả chat thường và chat tự động phát sinh khi tặng sao `isGift = true`).
*   **StreamGoal**: Mục tiêu sao của Streamer trong phòng live (ví dụ: đạt 5,000 sao để hát bài mới).
*   **PKBattle**: Thông tin trận đấu PK gồm hai phòng stream đối đầu, điểm số hai bên và kết quả.
*   **TreasureChest** & **TreasureClaim**: Quản lý việc tạo rương quà tặng sao và lịch sử Viewer giật sao thành công.
*   **Post**, **PostLike**, **PostComment**: Các thực thể cấu thành nên tính năng Bảng tin mạng xã hội.
*   **QuestDefinition** & **UserQuest**: Định nghĩa các loại nhiệm vụ hàng ngày và tiến trình thực tế của người dùng.

---

## 📁 Cấu trúc Thư mục Dự án

Hiểu rõ cấu trúc thư mục giúp bạn dễ dàng tìm kiếm và chỉnh sửa code:

```text
├── prisma/
│   ├── schema.prisma          # Định nghĩa Database Models của Prisma
│   └── seed.ts                # Kịch bản nạp dữ liệu mẫu (Seeding) ban đầu
├── public/                    # Chứa hình ảnh, favicon và tài nguyên tĩnh
├── server.js                  # Máy chủ WebSocket Gateway thời gian thực (Port 3001)
├── src/
│   ├── app/                   # Next.js App Router (Giao diện và API)
│   │   ├── api/               # Các endpoint API (auth, gifts, streams, quests, v.v.)
│   │   ├── backoffice/        # Giao diện quản trị hệ thống nội bộ
│   │   ├── profile/           # Trang cá nhân và Bảng tin (Social Feed)
│   │   ├── streamer/          # Giao diện và luồng điều khiển của Streamer
│   │   └── viewer/            # Giao diện xem stream và tương tác của Viewer
│   ├── backend/               # Logic nghiệp vụ Backend cốt lõi
│   │   ├── controllers/       # Điều phối yêu cầu API
│   │   ├── modules/           # Module nghiệp vụ (gift, stream, quest, pk, v.v.)
│   │   │   ├── gift/          # Chứa gift.worker.ts chạy ngầm xử lý queue
│   │   │   └── quest/         # Chứa quest.service.ts theo dõi nhiệm vụ
│   │   ├── shared/            # Tiện ích dùng chung cho Backend
│   │   │   ├── cache/         # Cấu hình Redis client
│   │   │   ├── database/      # Cấu hình kết nối Prisma Client (Singleton)
│   │   │   ├── middleware/    # Middleware xác thực và Rate Limiter
│   │   │   └── queue/         # Khởi tạo Bull Queue
│   ├── components/            # Các UI Component React dùng chung (Icons, QuestDrawer, v.v.)
│   ├── lib/                   # Thư viện dùng chung (công thức tính Level, Axios client)
│   └── store/                 # Cấu hình lưu trữ trạng thái Redux (nếu sử dụng)
```

---

## 🛠️ Hướng dẫn Cài đặt & Chạy Dự án (Developer Quickstart)

Để khởi chạy dự án tại máy cục bộ (Local Development), hãy thực hiện các bước theo thứ tự sau:

### 1. Yêu cầu Hệ thống (Prerequisites)
Đảm bảo máy tính của bạn đã cài đặt:
*   **Node.js** (Phiên bản v18 trở lên)
*   **PostgreSQL** (Đang chạy cổng mặc định `5432`)
*   **Redis Server** (Đang chạy cổng mặc định `6379`)

### 2. Cài đặt các gói phụ thuộc (Dependencies)
Clone dự án về máy, mở terminal tại thư mục gốc và chạy lệnh:
```bash
npm install
```

### 3. Cấu hình biến môi trường
Sao chép hoặc chỉnh sửa tệp `.env` tại thư mục gốc. Bạn có thể sử dụng cấu hình mặc định dưới đây (nhớ chỉnh sửa `DATABASE_URL` khớp với PostgreSQL của bạn):
```env
DATABASE_URL="postgresql://[username]:[password]@localhost:5432/livestream?schema=public"
NEXT_PUBLIC_WS_URL="ws://localhost:3001"
REDIS_URL="redis://localhost:6379"

# Cấu hình các thông số Rate Limit và Batching
GIFT_RATE_LIMIT_PER_USER=5
GIFT_RATE_LIMIT_WINDOW_MS=5000
GIFT_ROOM_RATE_LIMIT=1000
GIFT_BATCH_FLUSH_MS=200
WS_BROADCAST_INTERVAL_MS=300

BACKOFFICE_SECRET="livestar-backoffice-dev-2026"
```

### 4. Khởi tạo Cơ sở dữ liệu & Tạo dữ liệu mẫu
Chạy lệnh Prisma để đẩy schema vào database và tự động biên dịch Prisma Client:
```bash
npx prisma db push
```

Tiếp theo, chạy lệnh nạp dữ liệu mẫu (seeding) để tạo sẵn các tài khoản thử nghiệm như `alice` (streamer), `bob` (viewer VIP), `charlie` và `dave` cùng danh sách nhiệm vụ:
```bash
npx prisma db seed
```

### 5. Khởi chạy Hệ thống (Chạy đồng thời 3 terminal)
Để hệ thống hoạt động đầy đủ tính năng tương tác thời gian thực, bạn cần chạy 3 tiến trình sau:

*   **Terminal 1: Khởi động Next.js App Server (Frontend & REST API)**
    ```bash
    npm run dev
    ```
    Ứng dụng sẽ chạy tại địa chỉ: [http://localhost:3000](http://localhost:3000)

*   **Terminal 2: Khởi động WebSocket Gateway Server**
    ```bash
    node server.js
    ```
    WebSocket sẽ lắng nghe kết nối tại cổng `3001`

*   **Terminal 3: Khởi động Background Queue Workers**
    ```bash
    npm run workers
    ```
    Tiến trình này sẽ lắng nghe hàng đợi Bull để ghi nhận giao dịch tặng sao vào DB.

---

## 💡 Hướng dẫn Trải nghiệm Hệ thống (Testing Flow)

Sau khi khởi chạy thành công cả 3 tiến trình, hãy thử nghiệm luồng nghiệp vụ chính:
1.  Truy cập [http://localhost:3000](http://localhost:3000) trên trình duyệt.
2.  Ở góc trên cùng, chọn danh tính đăng nhập bằng tài khoản mẫu:
    *   Đăng nhập với vai trò **Streamer** bằng tài khoản `alice`.
    *   Mở một tab ẩn danh khác, đăng nhập vai trò **Viewer** bằng tài khoản `bob` (có sẵn 14,750 sao).
3.  Tài khoản `alice` nhấp vào **"Bắt đầu Live"** để tạo phòng stream (ở menu bên trái hoặc nút tạo nhanh).
4.  Tài khoản `bob` sẽ nhìn thấy phòng livestream của `alice` hiển thị trên màn hình trang chủ. Nhấp vào phòng để tham gia.
5.  Thử gửi tin nhắn chat, bật bảng nhiệm vụ làm Check-in nhận thêm sao, hoặc gửi tặng sao để kiểm tra hiệu ứng bay sao hoạt họa và xem tiến trình nhiệm vụ tặng quà tự động hoàn thành thời gian thực!

---

## 🔒 Kiến thức Kỹ thuật cốt lõi & Cơ chế Bảo mật

Khi làm việc với mã nguồn LiveStar, hãy lưu ý các mẫu thiết kế bảo mật và tối ưu đã được áp dụng:

### 1. Chống lỗi SQL Injection
*   **Cơ chế**: Prisma ORM tự động tham số hóa tất cả các câu truy vấn cơ sở dữ liệu (`Parameterized Queries`). Dữ liệu người dùng truyền lên không bao giờ được cộng chuỗi trực tiếp vào lệnh SQL, bảo vệ hệ thống tuyệt đối khỏi các lỗ hổng SQL Injection thông thường.

### 2. Sử dụng UUID thay thế ID tăng dần (Auto-increment ID)
*   **Lý do**: Sử dụng ID tăng dần tuần tự (1, 2, 3...) rất dễ gặp lỗi bảo mật **ID Enumeration Attack** (Tấn công quét ID). Kẻ xấu có thể thay đổi ID trên URL để đoán và truy cập phòng live hoặc thông tin người dùng khác. Dự án sử dụng UUID v4 dạng chuỗi ngẫu nhiên (ví dụ: `3f8e9a1b-c7d6...`) khiến việc dự đoán ID là bất khả thi.

### 3. Ngăn chặn tấn công XSS (Cross-Site Scripting) qua Chat
*   **Giải pháp**: Trong `server.js`, tất cả nội dung tin nhắn chat từ phía người dùng gửi lên đều đi qua bộ lọc làm sạch ký tự HTML đặc biệt (`&`, `<`, `>`, `"`, `'`) để ngăn chặn việc chèn mã JavaScript độc hại. Đồng thời trên frontend, hiển thị tin nhắn luôn dùng `{text}` (React text node) thay vì render HTML thô.

### 4. Đảm bảo tính toàn vẹn dữ liệu trong môi trường đồng thời cao
*   **Giao dịch Cơ sở dữ liệu (Prisma Transactions)**: Trong worker xử lý batch `gift.worker.ts`, toàn bộ các thao tác ghi dữ liệu (trừ sao người gửi, cộng sao streamer, tích lũy điểm số PK, cập nhật đích nhiệm vụ, tạo bản ghi GiftTransaction và tạo bình luận tặng quà) đều được gói gọn trong một câu lệnh `prisma.$transaction`. Nếu có bất kỳ lỗi nào xảy ra ở một bước, toàn bộ giao dịch sẽ được Rollback về trạng thái cũ, đảm bảo sao của người dùng không bao giờ bị trừ oan mà không lưu được lịch sử.

---

Chúc bạn có những trải nghiệm lập trình tuyệt vời cùng dự án **Livestream Stars**! Nếu gặp bất kỳ khó khăn nào trong quá trình thiết lập hoặc có câu hỏi về cấu trúc code, hãy liên hệ trực tiếp với Leader hoặc viết issue trên repository nội bộ của dự án. 🚀
