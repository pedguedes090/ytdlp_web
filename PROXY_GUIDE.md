# 🌐 Proxy Integration Guide

## Loại Proxy được khuyến nghị

### 1. **SOCKS5 Proxy** ⭐⭐⭐⭐⭐
- **Tốt nhất** cho yt-dlp và streaming
- Hỗ trợ TCP và UDP traffic
- Ít bị block bởi các platform
- Hiệu suất cao, độ trễ thấp

```javascript
// Example SOCKS5
proxy: "socks5://username:password@proxy.server.com:1080"
```

### 2. **HTTP/HTTPS Proxy** ⭐⭐⭐⭐
- Phổ biến và dễ tìm
- Giá rẻ, nhiều provider
- Tốt cho web scraping
- Có thể bị detect bởi một số platform

```javascript
// Example HTTP
proxy: "http://username:password@proxy.server.com:8080"
proxy: "https://username:password@proxy.server.com:443"
```

### 3. **Residential Proxy** ⭐⭐⭐⭐⭐
- **Tốt nhất** để tránh bị block
- IP thật từ ISP của người dùng
- Đắt hơn nhưng success rate cao
- Ideal cho Facebook, Instagram, TikTok

### 4. **Datacenter Proxy** ⭐⭐⭐
- Rẻ và nhanh
- Dễ bị block bởi anti-bot
- Tốt cho testing
- Không nên dùng cho production

## 🔧 Cấu hình Proxy

### Bước 1: Cập nhật config.json
```json
{
  "proxy": {
    "enabled": true,
    "type": "socks5",
    "host": "your-proxy.com",
    "port": 1080,
    "username": "your_username",
    "password": "your_password"
  }
}
```

### Bước 2: Cập nhật proxy-config.js
```javascript
const proxyConfig = {
    enabled: true,
    
    // Proxy pool cho load balancing
    pool: [
        'socks5://user1:pass1@proxy1.com:1080',
        'socks5://user2:pass2@proxy2.com:1080',
        'http://user3:pass3@proxy3.com:8080'
    ],
    
    // Platform-specific proxies
    platformSpecific: {
        'youtube.com': 'socks5://yt-proxy.com:1080',
        'facebook.com': 'socks5://fb-proxy.com:1080',
        'instagram.com': 'socks5://ig-proxy.com:1080',
        'tiktok.com': 'socks5://tiktok-proxy.com:1080'
    }
};
```

## 🌍 Recommended Proxy Providers

### Budget-Friendly ($5-20/month)
1. **ProxyMesh** - HTTP/SOCKS5, good for testing
2. **Storm Proxies** - Rotating residential
3. **MyPrivateProxy** - Datacenter proxies

### Premium ($20-100/month)
1. **Bright Data (Luminati)** - Best residential proxies
2. **Smartproxy** - High-quality residential
3. **Oxylabs** - Enterprise-grade
4. **NetNut** - Fast residential

### Free Options (Limited)
1. **ProxyMesh Free Tier** - 100 requests/day
2. **Free Proxy Lists** - Unreliable, use for testing only

## 🚀 Production Setup

### 1. Rotating Proxy Pool
```javascript
const proxyPool = [
    'socks5://user1:pass1@us1.proxy.com:1080',    // US East
    'socks5://user2:pass2@us2.proxy.com:1080',    // US West  
    'socks5://user3:pass3@eu1.proxy.com:1080',    // Europe
    'socks5://user4:pass4@asia1.proxy.com:1080'   // Asia
];
```

### 2. Geo-targeting
```javascript
// Auto-select proxy based on video region
function getProxyForRegion(videoUrl) {
    if (videoUrl.includes('youtube.com')) {
        return 'socks5://us-proxy.com:1080'; // US proxy for YouTube
    }
    if (videoUrl.includes('bilibili.com')) {
        return 'socks5://china-proxy.com:1080'; // China proxy
    }
    return getRandomProxy(proxyPool);
}
```

### 3. Failover Logic
```javascript
async function downloadWithRetry(url, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const proxy = getRandomProxy(proxyPool);
            const result = await downloadVideo(url, proxy);
            return result;
        } catch (error) {
            console.log(`Attempt ${i + 1} failed, trying different proxy...`);
            if (i === maxRetries - 1) throw error;
        }
    }
}
```

## 🛡️ Security Best Practices

### 1. Credential Management
```javascript
// Sử dụng environment variables
const proxyAuth = process.env.PROXY_AUTH; // username:password
const proxyHost = process.env.PROXY_HOST;
const proxyPort = process.env.PROXY_PORT;
```

### 2. IP Rotation
```javascript
// Rotate IP every N requests
let requestCount = 0;
const ROTATE_AFTER = 50;

function shouldRotateProxy() {
    return ++requestCount % ROTATE_AFTER === 0;
}
```

### 3. Rate Limiting
```javascript
// Add delays between requests
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Random delay 1-3 seconds
await delay(Math.random() * 2000 + 1000);
```

## 🔍 Testing Proxy

```bash
# Test proxy connectivity
curl --proxy socks5://username:password@proxy.com:1080 https://httpbin.org/ip

# Test with yt-dlp
yt-dlp --proxy socks5://username:password@proxy.com:1080 --get-url "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```

## 🚨 Troubleshooting

### Common Issues:
1. **Connection refused** → Check proxy credentials
2. **Timeout** → Try different proxy server
3. **Blocked** → Switch to residential proxy
4. **Slow download** → Use datacenter proxy closer to your location

### Platform-specific:
- **YouTube**: Residential > SOCKS5 > HTTP
- **Facebook/Instagram**: Residential proxies required
- **TikTok**: Geo-specific proxies work best
- **Twitter**: SOCKS5 proxies sufficient

## 💡 Pro Tips

1. **Mix proxy types** - Use different types for different platforms
2. **Monitor success rates** - Track which proxies work best
3. **Respect rate limits** - Don't abuse proxies to avoid bans
4. **Use proxy pools** - Distribute load across multiple proxies
5. **Test before deploy** - Always test proxies before production use
