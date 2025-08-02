// Simple proxy test for owner
const { exec } = require('child_process');

console.log('🔧 SIMPLE PROXY TEST FOR OWNER');
console.log('==============================');

// Test với video ngắn
const testUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const proxyUrl = 'socks5://dunkum:dun@104.214.189.133:1080';

console.log('Testing with actual yt-dlp download...');
console.log('This will try to get video info through your proxy\n');

const command = `yt-dlp --proxy "${proxyUrl}" --dump-json --no-download "${testUrl}"`;

console.log('Command:', command.replace(/dunkum:dun/, '***:***'));
console.log('Waiting for response...\n');

const startTime = Date.now();

exec(command, { timeout: 30000 }, (error, stdout, stderr) => {
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    
    if (error) {
        console.log(`❌ Test failed after ${duration}s`);
        console.log('Error details:');
        console.log(error.message);
        
        if (error.message.includes('Connection refused')) {
            console.log('\n💡 Suggestions:');
            console.log('1. Check if SOCKS5 service is actually running');
            console.log('2. Try telnet 104.214.189.133 1080 from another machine');
            console.log('3. Check firewall rules on 104.214.189.133');
            console.log('4. Verify SOCKS5 server allows external connections');
        }
        
        if (error.message.includes('Authentication')) {
            console.log('\n💡 Authentication issue:');
            console.log('1. Check username/password: dunkum/dun');
            console.log('2. Verify user exists in SOCKS5 server config');
            console.log('3. Check if authentication is required');
        }
        
    } else {
        console.log(`✅ SUCCESS! Proxy working after ${duration}s`);
        
        try {
            const videoInfo = JSON.parse(stdout);
            console.log(`📹 Video: ${videoInfo.title}`);
            console.log(`🔗 URL: ${videoInfo.webpage_url}`);
            console.log(`⏱️ Duration: ${videoInfo.duration}s`);
            console.log('\n🎉 Your proxy is working perfectly with yt-dlp!');
        } catch (e) {
            console.log('✅ Proxy connection successful (got response)');
        }
    }
});

// Also test basic connection without auth
console.log('Also testing basic connection...');
const basicCommand = `yt-dlp --dump-json --no-download "${testUrl}"`;

exec(basicCommand, { timeout: 15000 }, (error, stdout, stderr) => {
    if (!error) {
        console.log('✅ Direct connection (no proxy) also works');
    } else {
        console.log('❌ Even direct connection fails - network issue?');
    }
});
