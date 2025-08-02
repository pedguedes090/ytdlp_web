# 🚀 Hướng dẫn Deploy lên Hugging Face Spaces

## Bước 1: Chuẩn bị Repository

Đã có sẵn: https://github.com/pedguedes090/ytdlp_web

## Bước 2: Tạo Hugging Face Space

1. Đi tới https://huggingface.co/new-space
2. Điền thông tin:
   - **Space name**: `ytdlp-web` (hoặc tên bạn muốn)
   - **License**: MIT
   - **SDK**: Docker 
   - **Hardware**: CPU basic (miễn phí)

## Bước 3: Clone và Setup

```bash
git clone https://huggingface.co/spaces/[YOUR_USERNAME]/ytdlp-web
cd ytdlp-web
```

## Bước 4: Copy files từ GitHub repo

Copy tất cả files từ repository GitHub vào thư mục Hugging Face Space:

```
ytdlp-web/
├── Dockerfile          # ✅ Đã tạo
├── README.md           # Thay bằng README_HF.md  
├── .spacesignore       # ✅ Đã tạo
├── app.js              # ✅ Đã cập nhật port 7860
├── demo.html           # ✅ Đã cập nhật API_BASE
├── package.json        
├── config.json
└── downloads/          # Sẽ tự tạo
```

## Bước 5: Cập nhật README.md

Đổi tên `README_HF.md` thành `README.md` để Hugging Face hiển thị metadata đúng.

## Bước 6: Push lên Hugging Face

```bash
git add .
git commit -m "Initial deploy to Hugging Face Spaces"
git push
```

## Bước 7: Kiểm tra Deploy

- Hugging Face sẽ tự động build Docker image
- Có thể mất 5-10 phút để build xong
- Truy cập URL của Space để kiểm tra

## 🔧 Cấu hình quan trọng

### Dockerfile highlights:
- Base image: `python:3.11-slim`
- Cài ffmpeg, nodejs, npm
- Install yt-dlp qua pip
- Port 7860 (mặc định của HF)
- Bind `0.0.0.0` để accessible
- **Fix permission**: Tạo user và set chmod 777 cho downloads/
- **Fallback storage**: Dùng temp directory nếu app dir không writable

### App.js changes:
- Port: `process.env.PORT || 7860`
- Listen: `app.listen(PORT, '0.0.0.0')`
- **Permission handling**: Auto fallback to temp directory
- **Format selection**: Tối ưu để tránh yt-dlp warnings

### Demo.html changes:
- API_BASE: `window.location.origin` (tự động)

## 🚨 Lưu ý

1. **Miễn phí**: HF Spaces có giới hạn CPU và memory
2. **Timeout**: Apps có thể sleep sau một thời gian không dùng
3. **Storage**: File sẽ mất khi app restart (đã có auto-cleanup)
4. **Public**: Space sẽ public trừ khi upgrade Pro

## 🎯 URL sau khi deploy

```
https://huggingface.co/spaces/[YOUR_USERNAME]/ytdlp-web
```

## 🛠️ Troubleshooting

- **Build failed**: Kiểm tra Dockerfile syntax
- **App không start**: Kiểm tra port 7860
- **API không hoạt động**: Kiểm tra CORS và API_BASE
- **No space left**: Bật auto-cleanup trong config.json
- **Permission denied**: App tự động fallback sang temp directory
- **yt-dlp warnings**: Đã tối ưu format selection
- **Facebook/Instagram links**: Một số platform có thể block download

## 🔄 Common Issues & Solutions

### "Permission denied" error:
```
ERROR: unable to open for writing: [Errno 13] Permission denied
```
**Solution**: App đã được cập nhật để tự động sử dụng temp directory

### "Command failed" với yt-dlp:
- Kiểm tra URL có hợp lệ không
- Một số platform có thể thay đổi API
- Thử quality khác (worst thay vì best)

### App sleep trên HF Spaces:
- Apps miễn phí sẽ sleep sau 1 giờ không dùng
- Truy cập lại để wake up
- Upgrade Pro để avoid sleeping
