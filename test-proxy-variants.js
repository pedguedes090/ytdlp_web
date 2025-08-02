// Test proxy without authentication
const { exec } = require('child_process');

console.log('🔧 TESTING PROXY WITHOUT AUTHENTICATION');
console.log('======================================');

const testUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

// Test 1: No auth
console.log('1️⃣ Testing without username/password...');
const noAuthProxy = 'socks5://104.214.189.133:1080';
const cmd1 = `yt-dlp --proxy "${noAuthProxy}" --get-title --no-warnings "${testUrl}"`;

exec(cmd1, { timeout: 20000 }, (error, stdout, stderr) => {
    if (error) {
        console.log('❌ No-auth failed:', error.message.split('\n')[0]);
        
        // Test 2: Try different port
        console.log('\n2️⃣ Testing different port 1081...');
        const cmd2 = `yt-dlp --proxy "socks5://dunkum:dun@104.214.189.133:1081" --get-title --no-warnings "${testUrl}"`;
        
        exec(cmd2, { timeout: 20000 }, (error2, stdout2) => {
            if (error2) {
                console.log('❌ Port 1081 failed:', error2.message.split('\n')[0]);
                
                // Test 3: Try HTTP instead
                console.log('\n3️⃣ Testing HTTP proxy on port 8080...');
                const cmd3 = `yt-dlp --proxy "http://dunkum:dun@104.214.189.133:8080" --get-title --no-warnings "${testUrl}"`;
                
                exec(cmd3, { timeout: 20000 }, (error3, stdout3) => {
                    if (error3) {
                        console.log('❌ HTTP proxy failed:', error3.message.split('\n')[0]);
                        showSolutions();
                    } else {
                        console.log('✅ HTTP proxy works!');
                        console.log(`Title: ${stdout3.trim()}`);
                        console.log('\n🎉 Use HTTP proxy instead of SOCKS5!');
                        updateToHTTP();
                    }
                });
            } else {
                console.log('✅ Port 1081 works!');
                console.log(`Title: ${stdout2.trim()}`);
                updatePort();
            }
        });
    } else {
        console.log('✅ No authentication works!');
        console.log(`Title: ${stdout.trim()}`);
        console.log('\n🎉 Use proxy without authentication!');
        updateNoAuth();
    }
});

function updateNoAuth() {
    console.log('\n📝 Update proxy-config.js:');
    console.log('Remove username and password, keep only host and port');
}

function updatePort() {
    console.log('\n📝 Update proxy-config.js:');
    console.log('Change port from 1080 to 1081');
}

function updateToHTTP() {
    console.log('\n📝 Update proxy-config.js:');
    console.log('Change type from "socks5" to "http" and port to 8080');
}

function showSolutions() {
    console.log('\n🛠️ SOLUTIONS FOR PROXY OWNER:');
    console.log('=============================');
    console.log('');
    console.log('Your SOCKS5 server has "general SOCKS server failure"');
    console.log('This usually means:');
    console.log('');
    console.log('1️⃣ Authentication method mismatch:');
    console.log('   - Server expects no auth, but client sends auth');
    console.log('   - Server expects different auth method');
    console.log('');
    console.log('2️⃣ SOCKS5 server configuration:');
    console.log('   - Check allowed methods in server config');
    console.log('   - Verify user database');
    console.log('   - Check client IP restrictions');
    console.log('');
    console.log('3️⃣ Quick fixes to try:');
    console.log('   - Disable authentication on server');
    console.log('   - Add client IP to allowed list');
    console.log('   - Use HTTP proxy instead of SOCKS5');
    console.log('   - Check server logs for detailed errors');
}
