const http = require('http');

let students = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" }
];
let nextId = 3;

const server = http.createServer((req, res) => {
    const { method, url } = req;
    
    if (method === 'GET' && url === '/students') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(students));
    }
    
    else if (method === 'POST' && url === '/students') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                
                if (!data.name) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Name is required' }));
                    return;
                }
                
                const newStudent = {
                    id: nextId++,
                    name: data.name
                };
                
                students.push(newStudent);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newStudent));
                
            } catch {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    }
    
    else if (method === 'PUT' && url.startsWith('/students/')) {
        const id = parseInt(url.split('/')[2]);
        
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                
                if (!data.name) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Name is required' }));
                    return;
                }
                
                const studentIndex = students.findIndex(student => student.id === id);
                
                if (studentIndex === -1) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Student not found' }));
                    return;
                }
                
                students[studentIndex].name = data.name;
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(students[studentIndex]));
                
            } catch {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    }
    
    else if (method === 'DELETE' && url.startsWith('/students/')) {
        const id = parseInt(url.split('/')[2]);
        
        const studentIndex = students.findIndex(student => student.id === id);
        
        if (studentIndex === -1) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Student not found' }));
            return;
        }
        
        const deletedStudent = students.splice(studentIndex, 1)[0];
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Student deleted', student: deletedStudent }));
    }
    
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
});

server.listen(4000, () => {
    console.log('Server running on port 4000');
});

module.exports = server;
