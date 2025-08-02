// Proxy Configuration for yt-dlp
const proxyConfig = {
    enabled: false, // Set true để bật proxy
    
    // Single proxy
    single: {
        type: 'socks5', // 'socks5', 'http', 'https'
        host: 'proxy.example.com',
        port: 1080,
        username: '', // optional
        password: '', // optional
    },
    
    // Proxy pool cho load balancing
    pool: [
        'socks5://user1:pass1@proxy1.example.com:1080',
        'socks5://user2:pass2@proxy2.example.com:1080',
        'http://user3:pass3@proxy3.example.com:8080',
        // Thêm nhiều proxy khác...
    ],
    
    // Cấu hình retry
    retry: {
        maxAttempts: 3,
        rotateOnFailure: true
    },
    
    // Proxy cho từng platform
    platformSpecific: {
        'youtube.com': 'socks5://yt-proxy.com:1080',
        'facebook.com': 'http://fb-proxy.com:8080',
        'instagram.com': 'socks5://ig-proxy.com:1080',
        'tiktok.com': 'http://tiktok-proxy.com:8080'
    },
    
    // Geo-targeting
    regions: {
        'US': ['socks5://us1.proxy.com:1080', 'socks5://us2.proxy.com:1080'],
        'EU': ['socks5://eu1.proxy.com:1080', 'socks5://eu2.proxy.com:1080'],
        'ASIA': ['socks5://asia1.proxy.com:1080', 'socks5://asia2.proxy.com:1080']
    }
};

// Utility functions
function getProxyUrl(config) {
    if (!config) return null;
    
    const auth = config.username && config.password 
        ? `${config.username}:${config.password}@` 
        : '';
    
    return `${config.type}://${auth}${config.host}:${config.port}`;
}

function getRandomProxy(pool) {
    if (!pool || pool.length === 0) return null;
    return pool[Math.floor(Math.random() * pool.length)];
}

function getProxyForUrl(url) {
    if (!proxyConfig.enabled) return null;
    
    // Kiểm tra platform-specific proxy
    for (const [platform, proxy] of Object.entries(proxyConfig.platformSpecific)) {
        if (url.includes(platform)) {
            return proxy;
        }
    }
    
    // Dùng proxy pool hoặc single proxy
    if (proxyConfig.pool && proxyConfig.pool.length > 0) {
        return getRandomProxy(proxyConfig.pool);
    }
    
    return getProxyUrl(proxyConfig.single);
}

function validateProxy(proxyUrl) {
    // Basic validation
    const proxyRegex = /^(socks5|http|https):\/\/(?:([^:]+):([^@]+)@)?([^:]+):(\d+)$/;
    return proxyRegex.test(proxyUrl);
}

module.exports = {
    proxyConfig,
    getProxyUrl,
    getRandomProxy,
    getProxyForUrl,
    validateProxy
};
