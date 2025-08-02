// Enhanced proxy test with fallback
const { exec } = require('child_process');

const proxies = [
    {
        name: 'Your SOCKS5 Proxy',
        url: 'socks5://dunkum:dun@104.214.189.133:1080',
        test: true
    },
    {
        name: 'HTTP Alternative (if available)',
        url: 'http://dunkum:dun@104.214.189.133:8080',
        test: false // Set to true if you have HTTP version
    }
];

async function testProxy(proxy) {
    return new Promise((resolve) => {
        console.log(`\n🔍 Testing ${proxy.name}...`);
        console.log(`URL: ${proxy.url.replace(/\/\/[^@]+@/, '//***:***@')}`);
        
        const testUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        const command = `yt-dlp --proxy "${proxy.url}" --get-title --no-warnings "${testUrl}"`;
        
        const timeout = setTimeout(() => {
            console.log(`⏰ ${proxy.name} test timed out (30s)`);
            resolve(false);
        }, 30000);
        
        exec(command, (error, stdout, stderr) => {
            clearTimeout(timeout);
            
            if (error) {
                console.log(`❌ ${proxy.name} failed:`);
                console.log(`   Error: ${error.message.split('\n')[0]}`);
                resolve(false);
            } else {
                console.log(`✅ ${proxy.name} working!`);
                if (stdout.trim()) {
                    console.log(`   Retrieved title: ${stdout.trim()}`);
                }
                resolve(true);
            }
        });
    });
}

async function runTests() {
    console.log('🚀 Starting proxy connectivity tests...\n');
    
    for (const proxy of proxies) {
        if (proxy.test) {
            const result = await testProxy(proxy);
            if (result) {
                console.log(`\n✅ Proxy working! You can use: ${proxy.url.replace(/\/\/[^@]+@/, '//***:***@')}`);
                break;
            }
        }
    }
    
    console.log('\n📋 Proxy troubleshooting tips:');
    console.log('1. Check if proxy server is running and accessible');
    console.log('2. Verify credentials (username/password)');
    console.log('3. Check if your IP is whitelisted on proxy server');
    console.log('4. Try different proxy ports (1080, 8080, 3128)');
    console.log('5. Contact proxy provider for support');
    
    console.log('\n🔧 Alternative: Use the app without proxy for now');
    console.log('   Set "enabled": false in proxy-config.js');
}

runTests();
