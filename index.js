const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({
    target: 'https://super-morning-54b3.skilett67.workers.dev', 
    changeOrigin: true,
    ws: true
});

const server = http.createServer((req, res) => {
    proxy.web(req, res, (err) => {
        if (!res.headersSent) {
            res.writeHead(502);
            res.end('Bad Gateway');
        }
    });
});

server.on('upgrade', (req, socket, head) => {
    proxy.ws(req, socket, head);
});

// Яндекс сам подставит PORT
const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Proxy bridge is running on port ${port}`);
});
