// Test proxy mới
const { exec } = require('child_process');

console.log('🔧 TESTING NEW PROXY');
console.log('====================');
console.log('Host: 74.226.201.156:1080');
console.log('User: dunn');
console.log('Pass: 1234\n');

const testUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const proxyUrl = 'socks5://dunn:1234@74.226.201.156:1080';

console.log('Testing yt-dlp with new proxy...');

const command = `yt-dlp --proxy "${proxyUrl}" --get-title --no-warnings "${testUrl}"`;

console.log('Command:', command.replace(/dunn:1234/, '***:***'));
console.log('Waiting for response...\n');

const startTime = Date.now();

exec(command, { timeout: 30000 }, (error, stdout, stderr) => {
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    
    if (error) {
        console.log(`❌ New proxy failed after ${duration}s`);
        console.log('Error:', error.message.split('\n')[0]);
        
        if (error.message.includes('Connection refused')) {
            console.log('\n💡 Connection refused - proxy server might be down');
        } else if (error.message.includes('general SOCKS server failure')) {
            console.log('\n💡 SOCKS authentication or config issue');
        } else if (error.message.includes('timeout')) {
            console.log('\n💡 Proxy is slow or unresponsive');
        }
    } else {
        console.log(`✅ SUCCESS! New proxy working after ${duration}s`);
        console.log(`📹 Video title: ${stdout.trim()}`);
        console.log('\n🎉 Proxy 74.226.201.156:1080 is ready to use!');
        console.log('Your yt-dlp API will now use this proxy for all downloads.');
    }
});

// Also test basic connection
console.log('Testing direct connection for comparison...');
const directCommand = `yt-dlp --get-title --no-warnings "${testUrl}"`;

exec(directCommand, { timeout: 15000 }, (error, stdout) => {
    if (!error) {
        console.log('✅ Direct connection also works');
    }
});
