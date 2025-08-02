// Test proxy connection
const { exec } = require('child_process');

// Test proxy với yt-dlp
const testUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const proxyUrl = 'socks5://dunkum:dun@104.214.189.133:1080';

console.log('🔍 Testing proxy connectivity...');
console.log(`Proxy: ${proxyUrl.replace(/\/\/[^@]+@/, '//***:***@')}`);

const command = `yt-dlp --proxy "${proxyUrl}" --get-url --no-warnings "${testUrl}"`;

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.log('❌ Proxy test failed:');
        console.log('Error:', error.message);
        return;
    }
    
    if (stderr) {
        console.log('⚠️ Warnings:', stderr);
    }
    
    if (stdout && stdout.trim()) {
        console.log('✅ Proxy working! Video URL retrieved successfully:');
        console.log('First few URLs:', stdout.split('\n').slice(0, 3).join('\n'));
    } else {
        console.log('❌ No output received');
    }
});

// Test without proxy for comparison
console.log('\n🔍 Testing without proxy for comparison...');
const commandNoProxy = `yt-dlp --get-url --no-warnings "${testUrl}"`;

exec(commandNoProxy, (error, stdout, stderr) => {
    if (error) {
        console.log('❌ No-proxy test failed:', error.message);
        return;
    }
    
    if (stdout && stdout.trim()) {
        console.log('✅ No-proxy working! Connection successful.');
    }
});
