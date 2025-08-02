const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (for demo.html)
app.use(express.static(__dirname));

// Tạo thư mục downloads nếu chưa tồn tại
const downloadsDir = path.join(__dirname, 'downloads');
if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir);
}

// Auto-cleanup function - xóa file sau 5 phút
function scheduleFileCleanup(filePath, delay = 5 * 60 * 1000) { // 5 phút
    setTimeout(() => {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`🗑️ Đã xóa file: ${path.basename(filePath)}`);
        }
    }, delay);
}

// Generate unique ID for files
function generateFileId() {
    return crypto.randomBytes(8).toString('hex');
}

// Route để lấy thông tin video
app.post('/video-info', async (req, res) => {
    const { url } = req.body;
    
    if (!url) {
        return res.status(400).json({ error: 'URL là bắt buộc' });
    }

    const command = `yt-dlp --dump-json "${url}"`;
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('Lỗi:', error);
            return res.status(500).json({ error: 'Không thể lấy thông tin video', details: stderr });
        }
        
        try {
            const videoInfo = JSON.parse(stdout);
            res.json({
                title: videoInfo.title,
                duration: videoInfo.duration,
                uploader: videoInfo.uploader,
                view_count: videoInfo.view_count,
                thumbnail: videoInfo.thumbnail,
                formats: videoInfo.formats.map(format => ({
                    format_id: format.format_id,
                    ext: format.ext,
                    resolution: format.resolution,
                    filesize: format.filesize,
                    quality: format.quality
                }))
            });
        } catch (parseError) {
            res.status(500).json({ error: 'Lỗi phân tích dữ liệu video' });
        }
    });
});

// Route để tải video
app.post('/download', async (req, res) => {
    const { url, format = 'video', quality = 'best' } = req.body;
    
    if (!url) {
        return res.status(400).json({ error: 'URL là bắt buộc' });
    }

    // Tạo ID duy nhất cho file
    const fileId = generateFileId();
    const timestamp = Date.now();
    
    let command;
    let expectedExtension;
    
    if (format === 'audio') {
        // Tải audio
        expectedExtension = 'mp3';
        const outputTemplate = path.join(downloadsDir, `${fileId}.%(ext)s`);
        command = `yt-dlp -x --audio-format mp3 --audio-quality ${quality} -o "${outputTemplate}" "${url}"`;
    } else {
        // Tải video
        expectedExtension = 'mp4';
        const outputTemplate = path.join(downloadsDir, `${fileId}.%(ext)s`);
        command = `yt-dlp -f "${quality}" -o "${outputTemplate}" "${url}"`;
    }
    
    console.log('Đang thực thi lệnh:', command);
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('Lỗi tải xuống:', error);
            return res.status(500).json({ error: 'Không thể tải video', details: stderr });
        }
        
        console.log('Kết quả:', stdout);
        
        // Tìm file đã tải với fileId
        const files = fs.readdirSync(downloadsDir).filter(file => 
            file.startsWith(fileId)
        );
        
        if (files.length > 0) {
            const downloadedFile = files[0];
            const filePath = path.join(downloadsDir, downloadedFile);
            const stats = fs.statSync(filePath);
            
            // Lên lịch xóa file sau 5 phút
            scheduleFileCleanup(filePath);
            
            // Lấy thông tin video để trả về
            const getVideoInfoCommand = `yt-dlp --dump-json --no-download "${url}"`;
            exec(getVideoInfoCommand, (infoError, infoStdout) => {
                let videoInfo = null;
                if (!infoError) {
                    try {
                        videoInfo = JSON.parse(infoStdout);
                    } catch (e) {
                        console.log('Không thể parse thông tin video');
                    }
                }
                
                res.json({
                    success: true,
                    message: 'Tải video thành công',
                    fileId: fileId,
                    filename: downloadedFile,
                    originalTitle: videoInfo?.title || 'Unknown',
                    size: stats.size,
                    format: format,
                    quality: quality,
                    duration: videoInfo?.duration || null,
                    thumbnail: videoInfo?.thumbnail || null,
                    uploader: videoInfo?.uploader || null,
                    download_url: `/download-file/${downloadedFile}`,
                    direct_link: `${req.protocol}://${req.get('host')}/download-file/${downloadedFile}`,
                    expires_in: '5 phút',
                    created_at: new Date().toISOString()
                });
            });
        } else {
            res.status(500).json({ error: 'Không tìm thấy file đã tải' });
        }
    });
});

// Route để tải file đã download
app.get('/download-file/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(downloadsDir, filename);
    
    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).json({ error: 'File không tồn tại' });
    }
});

// Route để liệt kê các file đã tải (bỏ route này)
// app.get('/downloads', (req, res) => {
//     const files = fs.readdirSync(downloadsDir).map(filename => {
//         const filePath = path.join(downloadsDir, filename);
//         const stats = fs.statSync(filePath);
//         return {
//             filename,
//             size: stats.size,
//             created: stats.birthtime,
//             download_url: `/download-file/${filename}`
//         };
//     });
//     
//     res.json(files);
// });

// Route để xóa file
app.delete('/delete/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(downloadsDir, filename);
    
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        res.json({ success: true, message: 'Đã xóa file thành công' });
    } else {
        res.status(404).json({ error: 'File không tồn tại' });
    }
});

// Route kiểm tra trạng thái
app.get('/status', (req, res) => {
    exec('yt-dlp --version', (error, stdout, stderr) => {
        if (error) {
            res.json({ 
                status: 'error', 
                message: 'yt-dlp không được cài đặt hoặc không hoạt động',
                error: error.message 
            });
        } else {
            res.json({ 
                status: 'ok', 
                message: 'API hoạt động bình thường',
                yt_dlp_version: stdout.trim()
            });
        }
    });
});

// Route mặc định - redirect to demo
app.get('/', (req, res) => {
    res.redirect('/demo.html');
});

// API info route
app.get('/api', (req, res) => {
    res.json({
        message: 'YouTube Downloader API',
        version: '2.0.0',
        endpoints: {
            'GET /status': 'Kiểm tra trạng thái API',
            'POST /video-info': 'Lấy thông tin video (body: {url})',
            'POST /download': 'Tải video (body: {url, format?, quality?})',
            'GET /downloads': 'Liệt kê các file đã tải',
            'GET /download-file/:filename': 'Tải file đã download',
            'DELETE /delete/:filename': 'Xóa file'
        },
        demo: 'http://localhost:' + PORT + '/demo.html'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 API đang chạy tại http://localhost:${PORT}`);
    console.log(`📁 Thư mục tải xuống: ${downloadsDir}`);
});
