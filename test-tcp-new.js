// Test TCP connection cho proxy mới
const net = require('net');

console.log('🔍 Testing TCP connection to new proxy...');
console.log('Host: 74.226.201.156');
console.log('Port: 1080\n');

const socket = new net.Socket();

const timeout = setTimeout(() => {
    socket.destroy();
    console.log('❌ TCP connection timeout (10s)');
    console.log('\n💡 Proxy server might be:');
    console.log('   - Offline/down');
    console.log('   - Blocking your IP');
    console.log('   - Behind firewall');
}, 10000);

socket.connect(1080, '74.226.201.156', () => {
    clearTimeout(timeout);
    console.log('✅ TCP connection successful!');
    console.log('Proxy server is reachable and listening on port 1080');
    socket.destroy();
});

socket.on('error', (err) => {
    clearTimeout(timeout);
    console.log(`❌ TCP connection failed: ${err.message}`);
    
    if (err.code === 'ECONNREFUSED') {
        console.log('\n💡 Connection refused means:');
        console.log('   - Nothing is listening on port 1080');
        console.log('   - Proxy service is not running');
        console.log('   - Wrong IP or port');
    } else if (err.code === 'ETIMEDOUT') {
        console.log('\n💡 Connection timeout means:');
        console.log('   - Server is unreachable');
        console.log('   - Firewall blocking connection');
        console.log('   - Network routing issue');
    }
});
