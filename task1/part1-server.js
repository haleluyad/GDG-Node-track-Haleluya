// ============================================
// PART 1: BASIC HTTP SERVER (PORT 3000)
// ============================================

const http = require('http');

const server = http.createServer((req, res) => {
    const { method, url } = req;
    
    // Set CORS headers for all responses
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle OPTIONS request (CORS preflight)
    if (method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // ========== GET REQUESTS ==========
    if (method === 'GET') {
        if (url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Welcome to the Home Page');
        } 
        else if (url === '/info') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('This is the information page');
        } 
        else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Page Not Found');
        }
    }
    
    // ========== POST REQUESTS ==========
    else if (method === 'POST' && url === '/submit') {
        let body = '';
        
        // Collect data from request
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        // When all data is received
        req.on('end', () => {
            try {
                // Parse JSON and send it back
                const data = JSON.parse(body);
                res.writeHead(200, { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(JSON.stringify(data));
            } catch (error) {
                // Handle invalid JSON
                res.writeHead(400, { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(JSON.stringify({ 
                    error: 'Invalid JSON format',
                    message: 'Please send valid JSON data'
                }));
            }
        });
    }
    
    // ========== OTHER METHODS ==========
    else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
});

// Start the server
server.listen(3000, () => {
    console.log('✅ Basic HTTP Server is running!');
    console.log('🌐 Open: http://localhost:3000');
    console.log('📌 Available routes:');
    console.log('   GET  /      → Welcome to the Home Page');
    console.log('   GET  /info  → This is the information page');
    console.log('   POST /submit → Echo back JSON data');
    console.log('=========================================');
});

// Export for testing (if needed)
module.exports = server;