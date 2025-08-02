# 🔧 Proxy Troubleshooting Guide

## ❌ Lỗi proxy hiện tại:
```
ERROR: Unable to download API page: Failed to establish a new connection: 
[WinError 10061] No connection could be made because the target machine actively refused it
```

## 🛠️ Các bước khắc phục:

### 1. **Kiểm tra proxy server**
```bash
# Test với telnet (nếu có)
telnet 104.214.189.133 1080

# Hoặc test với curl
curl --connect-timeout 10 --proxy socks5://dunkum:dun@104.214.189.133:1080 https://httpbin.org/ip
```

### 2. **Kiểm tra thông tin proxy**
- ✅ IP: `104.214.189.133`
- ✅ Port: `1080`  
- ✅ Username: `dunkum`
- ✅ Password: `dun`
- ✅ Type: `SOCKS5`

### 3. **Possible Issues:**

#### A. **Proxy server down/offline**
- Liên hệ provider kiểm tra status
- Thử proxy khác nếu có

#### B. **IP whitelist**
- Proxy có thể require IP whitelist
- Thêm IP public của bạn vào whitelist

#### C. **Port blocked**
- ISP có thể block port 1080
- Thử port khác: 8080, 3128, 1081

#### D. **Credentials expired**
- Username/password có thể đã expire
- Reset credentials với provider

### 4. **Test proxy manually:**

```javascript
// Chạy: node test-proxy-enhanced.js
// Sẽ test connectivity và báo kết quả
```

### 5. **Alternative solutions:**

#### A. **Sử dụng HTTP proxy** (nếu có):
```json
{
  "proxy": {
    "enabled": true,
    "type": "http",
    "host": "104.214.189.133",
    "port": 8080,
    "username": "dunkum",
    "password": "dun"
  }
}
```

#### B. **Dùng proxy khác tạm thời:**
- Free proxy cho test: https://www.proxy-list.download/
- Paid proxy: Bright Data, Smartproxy, Oxylabs

#### C. **Chạy without proxy:**
```json
{
  "proxy": {
    "enabled": false
  }
}
```

## 🚀 Khi proxy hoạt động:

### Bật proxy:
1. Set `"enabled": true` trong `config.json`
2. Set `enabled: true` trong `proxy-config.js`  
3. Restart app: `npm start`

### Verify:
```bash
# Check logs khi download
npm start
# Sẽ thấy: "🌐 Sử dụng proxy: socks5://***:***@104.214.189.133:1080"
```

## 📞 Contact proxy provider:

Nếu vẫn không hoạt động, liên hệ provider với thông tin:
- IP của bạn cần whitelist
- Error message: "Connection refused"
- Request check proxy server status

---

**Current status**: Proxy đã được config nhưng tạm thời disabled để app vẫn hoạt động.
