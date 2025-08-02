// Debug script cho chủ proxy server
const { exec } = require('child_process');
const net = require('net');

console.log('🔧 PROXY SERVER DIAGNOSTIC TOOL');
console.log('================================');
console.log('Proxy: 104.214.189.133:1080 (SOCKS5)');
console.log('Owner: dunkum\n');

// 1. Test basic connectivity
function testBasicConnection() {
    return new Promise((resolve) => {
        console.log('1️⃣ Testing basic TCP connection...');
        
        const socket = new net.Socket();
        const timeout = setTimeout(() => {
            socket.destroy();
            console.log('❌ TCP connection timeout (10s)');
            resolve(false);
        }, 10000);
        
        socket.connect(1080, '104.214.189.133', () => {
            clearTimeout(timeout);
            console.log('✅ TCP connection successful!');
            socket.destroy();
            resolve(true);
        });
        
        socket.on('error', (err) => {
            clearTimeout(timeout);
            console.log(`❌ TCP connection failed: ${err.message}`);
            resolve(false);
        });
    });
}

// 2. Test SOCKS5 handshake
function testSOCKS5() {
    return new Promise((resolve) => {
        console.log('\n2️⃣ Testing SOCKS5 handshake...');
        
        const testCommand = `curl --connect-timeout 10 --max-time 20 --proxy socks5://dunkum:dun@104.214.189.133:1080 -s -o /dev/null -w "%{http_code}" https://httpbin.org/ip`;
        
        exec(testCommand, (error, stdout, stderr) => {
            if (error) {
                console.log('❌ SOCKS5 test failed (curl not available or proxy issue)');
                console.log(`   Error: ${error.message.split('\n')[0]}`);
                resolve(false);
            } else {
                console.log(`✅ SOCKS5 handshake successful! HTTP code: ${stdout}`);
                resolve(true);
            }
        });
    });
}

// 3. Test with yt-dlp
function testYtDlp() {
    return new Promise((resolve) => {
        console.log('\n3️⃣ Testing with yt-dlp...');
        
        const testUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        const command = `yt-dlp --proxy "socks5://dunkum:dun@104.214.189.133:1080" --get-title --no-warnings "${testUrl}"`;
        
        const timeout = setTimeout(() => {
            console.log('❌ yt-dlp test timeout (30s)');
            resolve(false);
        }, 30000);
        
        exec(command, (error, stdout, stderr) => {
            clearTimeout(timeout);
            
            if (error) {
                console.log('❌ yt-dlp test failed:');
                console.log(`   ${error.message.split('\n')[0]}`);
                resolve(false);
            } else {
                console.log('✅ yt-dlp test successful!');
                if (stdout.trim()) {
                    console.log(`   Video title: ${stdout.trim()}`);
                }
                resolve(true);
            }
        });
    });
}

// 4. Provide troubleshooting tips
function provideTroubleshooting() {
    console.log('\n🛠️ TROUBLESHOOTING TIPS FOR PROXY OWNER:');
    console.log('=========================================');
    console.log('');
    console.log('If tests failed, check these on your proxy server:');
    console.log('');
    console.log('🔍 Server Status:');
    console.log('   - Is proxy service running?');
    console.log('   - Check: systemctl status dante-server (or your proxy software)');
    console.log('   - Restart: systemctl restart dante-server');
    console.log('');
    console.log('🔍 Configuration:');
    console.log('   - Is port 1080 open in firewall?');
    console.log('   - Check: netstat -ln | grep 1080');
    console.log('   - User "dunkum" exists and has permission?');
    console.log('');
    console.log('🔍 Network:');
    console.log('   - Server has internet connectivity?');
    console.log('   - DNS resolution working?');
    console.log('   - No ISP blocking?');
    console.log('');
    console.log('🔧 Quick fixes:');
    console.log('   - Restart proxy service');
    console.log('   - Check proxy logs for errors');
    console.log('   - Verify user credentials');
    console.log('   - Test from server: curl --proxy socks5://localhost:1080 google.com');
}

// Run all tests
async function runDiagnostics() {
    const test1 = await testBasicConnection();
    const test2 = test1 ? await testSOCKS5() : false;
    const test3 = test2 ? await testYtDlp() : false;
    
    console.log('\n📊 DIAGNOSTIC SUMMARY:');
    console.log('======================');
    console.log(`TCP Connection: ${test1 ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`SOCKS5 Handshake: ${test2 ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`yt-dlp Integration: ${test3 ? '✅ PASS' : '❌ FAIL'}`);
    
    if (test3) {
        console.log('\n🎉 ALL TESTS PASSED! Proxy is working perfectly!');
        console.log('Your yt-dlp API is ready to use with proxy.');
    } else {
        provideTroubleshooting();
    }
}

runDiagnostics();
