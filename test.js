// Test script cho YouTube Downloader API
const fetch = require('node-fetch');

const API_BASE = 'http://localhost:3000';

// Hàm test kiểm tra trạng thái
async function testStatus() {
    console.log('🔍 Kiểm tra trạng thái API...');
    try {
        const response = await fetch(`${API_BASE}/status`);
        const data = await response.json();
        console.log('✅ Kết quả:', data);
    } catch (error) {
        console.error('❌ Lỗi:', error.message);
    }
}

// Hàm test lấy thông tin video
async function testVideoInfo(url) {
    console.log('\n📋 Lấy thông tin video...');
    try {
        const response = await fetch(`${API_BASE}/video-info`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });
        const data = await response.json();
        
        if (response.ok) {
            console.log('✅ Thông tin video:');
            console.log(`   Tiêu đề: ${data.title}`);
            console.log(`   Kênh: ${data.uploader}`);
            console.log(`   Thời lượng: ${Math.floor(data.duration / 60)}:${(data.duration % 60).toString().padStart(2, '0')}`);
            console.log(`   Lượt xem: ${data.view_count?.toLocaleString() || 'N/A'}`);
            console.log(`   Số định dạng: ${data.formats?.length || 0}`);
        } else {
            console.error('❌ Lỗi:', data.error);
        }
    } catch (error) {
        console.error('❌ Lỗi:', error.message);
    }
}

// Hàm test tải video
async function testDownload(url, format = 'video', quality = 'worst') {
    console.log('\n⬇️ Tải video...');
    try {
        const response = await fetch(`${API_BASE}/download`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url, format, quality })
        });
        const data = await response.json();
        
        if (response.ok) {
            console.log('✅ Tải thành công:');
            console.log(`   File: ${data.filename}`);
            console.log(`   Link tải: ${API_BASE}${data.download_url}`);
        } else {
            console.error('❌ Lỗi:', data.error);
        }
    } catch (error) {
        console.error('❌ Lỗi:', error.message);
    }
}

// Hàm test liệt kê file
async function testListDownloads() {
    console.log('\n📁 Liệt kê file đã tải...');
    try {
        const response = await fetch(`${API_BASE}/downloads`);
        const files = await response.json();
        
        if (files.length === 0) {
            console.log('📂 Chưa có file nào được tải về');
        } else {
            console.log('📂 Danh sách file:');
            files.forEach((file, index) => {
                const size = (file.size / (1024 * 1024)).toFixed(2);
                console.log(`   ${index + 1}. ${file.filename} (${size} MB)`);
            });
        }
    } catch (error) {
        console.error('❌ Lỗi:', error.message);
    }
}

// Chạy test
async function runTests() {
    console.log('🚀 Bắt đầu test YouTube Downloader API\n');
    
    // Test URL mẫu (video ngắn)
    const testUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    
    await testStatus();
    await testVideoInfo(testUrl);
    
    // Uncomment dòng dưới để test tải video (chỉ nên test với video ngắn)
    // await testDownload(testUrl, 'video', 'worst');
    
    await testListDownloads();
    
    console.log('\n✨ Hoàn thành test!');
}

// Chạy nếu file được execute trực tiếp
if (require.main === module) {
    runTests().catch(console.error);
}

module.exports = {
    testStatus,
    testVideoInfo,
    testDownload,
    testListDownloads
};
