# Yo## ✨ Tính năng mới (v2.1)

- 🎥 **Video Player tích hợp** - Xem video ngay trên web sau khi tải
- 🎵 **Audio Player** - Nghe nhạc trực tiếp cho file MP3
- 🆔 **Hệ thống File ID** - Tên file được chuyển thành ID duy nhất để dễ quản lý
- ⏰ **Auto Cleanup** - File tự động xóa sau 5 phút để tiết kiệm dung lượng
- 🔗 **Direct Link** - Link trực tiếp và copy link dễ dàng
- 📱 **Modern UI** - Giao diện đẹp, responsive và thân thiện
- 🚫 **Đã bỏ phần "File Đã Tải"** - Tập trung vào trải nghiệm xem/nghe trực tiếpnloader API v2.1 🎬

API hiện đại để tải video từ YouTube và các nền tảng khác sử dụng yt-dlp và Node.js với video player tích hợp và tự động cleanup.

## ✨ Tính năng mới (v2.1)

- � **Video Player tích hợp** - Xem video ngay trên web sau khi tải
- 🎵 **Audio Player** - Nghe nhạc trực tiếp cho file MP3
- � **Hệ thống File ID** - Tên file được chuyển thành ID duy nhất để dễ quản lý
- ⏰ **Auto Cleanup** - File tự động xóa sau 5 phút để tiết kiệm dung lượng
- � **Direct Link** - Link trực tiếp và copy link dễ dàng
- 📱 **Modern UI** - Giao diện đẹp, responsive và thân thiện
- � **Đã bỏ phần "File Đã Tải"** - Tập trung vào trải nghiệm xem/nghe trực tiếp

## 🚀 Cài đặt và Chạy

### 1. Cài đặt dependencies
```bash
# Cài đặt yt-dlp
pip install yt-dlp

# Cài đặt FFmpeg (để xử lý audio)
winget install ffmpeg

# Cài đặt Node.js dependencies
npm install
```

### 2. Chạy ứng dụng
```bash
npm start
```

### 3. Mở ứng dụng
Truy cập: **http://localhost:3000**

## 🎯 Cách sử dụng

1. **Nhập URL** video từ YouTube hoặc trang web khác
2. **Chọn chất lượng** (best, worst, 720p, 480p, 360p)
3. **Chọn định dạng** (Video hoặc Audio MP3)
4. **Xem thông tin** để kiểm tra video trước khi tải
5. **Tải xuống** và xem/nghe trực tiếp trên web
6. **Copy link** hoặc tải về máy nếu cần

## 🎨 Giao diện

### Input Section
- URL input với validation
- Dropdown chọn chất lượng
- Radio buttons cho định dạng
- Buttons xem thông tin và tải xuống

### Preview Section  
- Thumbnail video
- Thông tin chi tiết (title, duration, views, uploader)
- Số lượng định dạng có sẵn

### Download Results
- **Video**: Video player HTML5 với controls
- **Audio**: Audio player với visualizer
- Thông tin file (ID, size, format, expire time)
- Buttons tải về và copy link

## 🔧 API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/status` | Kiểm tra trạng thái API |
| POST | `/video-info` | Lấy thông tin video |
| POST | `/download` | Tải video/audio |
| GET | `/download-file/:filename` | Stream file |
| DELETE | `/delete/:filename` | Xóa file (admin) |

## 📦 Cấu trúc Response

### Download Response
```json
{
  "success": true,
  "message": "Tải video thành công",
  "fileId": "abc123def456",
  "filename": "abc123def456.mp4",
  "originalTitle": "Video Title",
  "size": 12345678,
  "format": "video",
  "quality": "worst",
  "duration": 213,
  "thumbnail": "https://...",
  "uploader": "Channel Name",
  "download_url": "/download-file/abc123def456.mp4",
  "direct_link": "http://localhost:3000/download-file/abc123def456.mp4",
  "expires_in": "5 phút",
  "created_at": "2025-08-02T09:51:58.204Z"
}
```

## ⚡ Tính năng kỹ thuật

### Auto Cleanup System
- File tự động xóa sau 5 phút
- Tiết kiệm dung lượng server
- Tránh tích tụ file rác

### File ID System
- ID ngẫu nhiên 16 ký tự hex
- Tránh trùng lặp tên file
- Bảo mật tốt hơn

### Video/Audio Streaming
- HTML5 player tích hợp
- Support nhiều format
- Controls đầy đủ

## 🌐 Websites được hỗ trợ

Hàng nghìn website được hỗ trợ bởi yt-dlp:
- YouTube, TikTok, Facebook, Instagram
- Twitter, Vimeo, Twitch, Dailymotion  
- VTV, VOV, VTC, FPT Play
- Và hàng nghìn trang khác...

## 📁 Cấu trúc dự án

```
d:\ytdlp/
├── app.js              # API server chính
├── demo.html           # Giao diện web hiện đại
├── config.json         # Cấu hình ứng dụng
├── package.json        # Dependencies
├── README.md           # Tài liệu
├── test.js            # Test scripts
└── downloads/         # Thư mục tạm (auto cleanup)
```

## 🛠️ Cấu hình

Chỉnh sửa `config.json`:
```json
{
  "autoCleanup": {
    "enabled": true,
    "fileLifetime": 300000
  },
  "features": {
    "videoPlayer": true,
    "audioPlayer": true,
    "directDownload": true,
    "copyLink": true
  }
}
```

## 🔐 Bảo mật

- File ID ngẫu nhiên 
- Auto cleanup tránh lưu trữ lâu dài
- CORS protection
- Input validation

## 🚨 Lưu ý quan trọng

- ⚠️ File sẽ **tự động xóa sau 5 phút**
- 💾 Tải về máy nếu muốn lưu trữ lâu dài
- 🌐 Chỉ dùng cho mục đích cá nhân và giáo dục
- 📞 Tuân thủ quy định bản quyền của từng trang web

## API Endpoints

### 1. Kiểm tra trạng thái
- **GET** `/status`
- Kiểm tra API và phiên bản yt-dlp

### 2. Lấy thông tin video
- **POST** `/video-info`
- Body: `{ "url": "https://youtube.com/watch?v=..." }`
- Trả về thông tin chi tiết về video

### 3. Tải video
- **POST** `/download`
- Body: 
  ```json
  {
    "url": "https://youtube.com/watch?v=...",
    "format": "video", // hoặc "audio"
    "quality": "best"  // hoặc "worst", "720p", etc.
  }
  ```

### 4. Liệt kê file đã tải
- **GET** `/downloads`
- Hiển thị danh sách các file đã tải về

### 5. Tải file về máy
- **GET** `/download-file/:filename`
- Tải file từ server về máy

### 6. Xóa file
- **DELETE** `/delete/:filename`
- Xóa file khỏi server

## Ví dụ sử dụng

### Lấy thông tin video:
```javascript
fetch('http://localhost:3000/video-info', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

### Tải video:
```javascript
fetch('http://localhost:3000/download', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    format: 'video',
    quality: 'best'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

### Tải chỉ audio:
```javascript
fetch('http://localhost:3000/download', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    format: 'audio',
    quality: '192'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

## Lưu ý

- Các file được tải về sẽ được lưu trong thư mục `downloads/`
- API hỗ trợ tất cả các trang web mà yt-dlp hỗ trợ
- Chất lượng video có thể được chỉ định: 'best', 'worst', '720p', '480p', etc.
- Đối với audio: '0' (best), '9' (worst), hoặc bitrate như '192', '320'

## Cấu trúc dự án

```
ytdlp/
├── app.js          # File chính của API
├── package.json    # Dependencies và scripts
├── downloads/      # Thư mục chứa file đã tải (tự động tạo)
└── README.md       # Hướng dẫn sử dụng
```
