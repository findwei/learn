const http = require('http');

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
    // 设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // 设置响应头，指定 Transfer-Encoding 为 chunked
    res.writeHead(200, { 'Content-Type': 'text/plain', 'Transfer-Encoding': 'chunked' });
    // 模拟分块传输，每隔一秒发送一个数据块
    for (let i = 1; i <= 5; i++) {
        setTimeout(() => {
            let = obj = {
                "code": "0",
                "data": `\nChunk-${i}\n使用了特殊符号`
            }
            res.write(JSON.stringify(obj));
            if (i === 5) {
                // 数据发送完毕时发送结束标志
                res.end();
            }
        }, i * 1000);
    }
});

// 监听端口
const PORT = 3200;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});