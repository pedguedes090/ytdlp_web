---
title: YouTube Downloader API
emoji: 🎬
colorFrom: red
colorTo: purple
sdk: docker
pinned: false
license: mit
app_port: 7860
---

# YouTube Downloader API v2.1 🎬

Modern API để tải video từ YouTube và các nền tảng khác với giao diện web đẹp mắt!

## ✨ Tính năng chính

- 🎥 **Video Player tích hợp** - Xem video ngay sau khi tải
- 🎵 **Audio Player** - Nghe nhạc MP3 trực tiếp  
- 🆔 **File ID System** - Quản lý file bằng ID duy nhất
- ⏰ **Auto Cleanup** - File tự xóa sau 5 phút
- 🔗 **Direct Links** - Copy link và chia sẻ dễ dàng
- 📱 **Modern UI** - Giao diện responsive với Tailwind CSS

## 🚀 Cách sử dụng

1. **Nhập URL** từ YouTube, TikTok, Facebook, Instagram...
2. **Chọn chất lượng** (best, worst, 720p, 480p, 360p)
3. **Chọn định dạng** (Video MP4 hoặc Audio MP3)
4. **Tải xuống** và xem/nghe trực tiếp!

## 🌐 Websites được hỗ trợ

Hàng nghìn trang web được hỗ trợ bởi yt-dlp:
- YouTube, TikTok, Facebook, Instagram
- Twitter, Vimeo, Twitch, Dailymotion
- VTV, VOV, VTC, FPT Play
- Và hàng nghìn trang khác...

## 🔧 API Endpoints

- `GET /` - Giao diện web
- `GET /status` - Kiểm tra trạng thái
- `POST /video-info` - Lấy thông tin video
- `POST /download` - Tải video/audio
- `GET /download-file/:id` - Stream file

## 🚨 Lưu ý

- File sẽ **tự động xóa sau 5 phút**
- Chỉ dùng cho mục đích cá nhân và giáo dục
- Tuân thủ quy định bản quyền

---

Được phát triển với ❤️ sử dụng Node.js, yt-dlp và Tailwind CSS
