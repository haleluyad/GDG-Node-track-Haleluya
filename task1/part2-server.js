// ============================================
// PART 2: STUDENT REST API (PORT 4000)
// ============================================

const http = require('http');

// In-memory database for students
let students = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" }
];
let nextId = 4; // For new students

const server = http.createServer((req, res) => {
    const { method, url } = req;
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle OPTIONS request
    if (method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // ========== GET ALL STUDENTS ==========
    if (method === 'GET' && url === '/students') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: true,
            count: students.length,
            data: students
        }));
    }
    
    // ========== CREATE NEW STUDENT ==========
    else if (method === 'POST' && url === '/students') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                
                // Validate input
                if (!data.name || data.name.trim() === '') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 
                        success: false, 
                        error: 'Student name is required' 
                    }));
                    return;
                }
                
                // Create new student
                const newStudent = {
                    id: nextId++,
                    name: data.name.trim()
                };
                
                // Add to database
                students.push(newStudent);
                
                // Send response
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: true,
                    message: 'Student created successfully',
                    data: newStudent
                }));
                
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ 
                    success: false, 
                    error: 'Invalid JSON format' 
                }));
            }
        });
    }
    
    // ========== UPDATE STUDENT ==========
    else if (method === 'PUT' && url.startsWith('/students/')) {
        const id = parseInt(url.split('/')[2]);
        
        if (isNaN(id)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 
                success: false, 
                error: 'Invalid student ID' 
            }));
            return;
        }
        
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                
                // Validate input
                if (!data.name || data.name.trim() === '') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 
                        success: false, 
                        error: 'Student name is required' 
                    }));
                    return;
                }
                
                // Find student
                const studentIndex = students.findIndex(student => student.id === id);
                
                if (studentIndex === -1) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 
                        success: false, 
                        error: `Student with ID ${id} not found` 
                    }));
                    return;
                }
                
                // Update student
                students[studentIndex].name = data.name.trim();
                
                // Send response
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: true,
                    message: 'Student updated successfully',
                    data: students[studentIndex]
                }));
                
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ 
                    success: false, 
                    error: 'Invalid JSON format' 
                }));
            }
        });
    }
    
    // ========== DELETE STUDENT ==========
    else if (method === 'DELETE' && url.startsWith('/students/')) {
        const id = parseInt(url.split('/')[2]);
        
        if (isNaN(id)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 
                success: false, 
                error: 'Invalid student ID' 
            }));
            return;
        }
        
        // Find student
        const studentIndex = students.findIndex(student => student.id === id);
        
        if (studentIndex === -1) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 
                success: false, 
                error: `Student with ID ${id} not found` 
            }));
            return;
        }
        
        // Remove student
        const deletedStudent = students.splice(studentIndex, 1)[0];
        
        // Send response
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: true,
            message: 'Student deleted successfully',
            data: deletedStudent
        }));
    }
    
    // ========== INVALID ROUTE ==========
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            success: false, 
            error: 'Route not found' 
        }));
    }
});

// Start the server
server.listen(4000, () => {
    console.log('✅ Student REST API is running!');
    console.log('🌐 Open: http://localhost:4000/students');
    console.log('📌 Available endpoints:');
    console.log('   GET    /students        → Get all students');
    console.log('   POST   /students        → Create new student');
    console.log('   PUT    /students/:id    → Update student');
    console.log('   DELETE /students/:id    → Delete student');
    console.log('=========================================');
});

module.exports = server;