const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.end('Welcome to the Home Page');
    } 
    else if (req.method === 'GET' && req.url === '/info') {
        res.end('This is the information page');
    }
    else if (req.method === 'POST' && req.url === '/submit') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            try {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(body);
            } catch {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid JSON');
            }
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(3000);
