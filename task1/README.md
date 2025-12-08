# 📚 GDG Node.js Track - Task 1

## 🎯 Assignment: Basic HTTP Server & Student REST API

### 📁 Project Structure
GDG-Node-track-Haleluya/
└── task1/
├── part1-server.js # Basic HTTP Server (Port 3000)
├── part2-server.js # Student REST API (Port 4000)
├── package.json # Node.js configuration
└── README.md # This file

text

### 🚀 How to Run

#### Option 1: Run Servers Separately
```bash
# Open two terminal windows

# Terminal 1 - Basic HTTP Server
cd task1
node part1-server.js

# Terminal 2 - Student REST API
cd task1
node part2-server.js
Option 2: Use VS Code
Open the task1 folder in VS Code

Open two terminals in VS Code (Terminal → Split Terminal)

Run each server in separate terminals

🌐 Server 1: Basic HTTP Server (Port 3000)
Endpoints:

GET / → Returns: "Welcome to the Home Page"

GET /info → Returns: "This is the information page"

POST /submit → Accepts JSON, returns same JSON

Test in browser: http://localhost:3000

🎓 Server 2: Student REST API (Port 4000)
Endpoints:

GET /students → Get all students

POST /students → Create new student (send JSON with "name")

PUT /students/:id → Update student

DELETE /students/:id → Delete student

Test in browser: http://localhost:4000/students

🧪 Testing with curl (Command Line)
Test Server 1:
bash
# Test GET /
curl http://localhost:3000/

# Test GET /info
curl http://localhost:3000/info

# Test POST /submit
curl -X POST http://localhost:3000/submit \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello World", "data": [1,2,3]}'
Test Server 2:
bash
# Get all students
curl http://localhost:4000/students

# Create new student
curl -X POST http://localhost:4000/students \
  -H "Content-Type: application/json" \
  -d '{"name": "Your Name"}'

# Update student (replace 1 with actual ID)
curl -X PUT http://localhost:4000/students/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Name"}'

# Delete student (replace 1 with actual ID)
curl -X DELETE http://localhost:4000/students/1
📝 Requirements Checklist
Basic HTTP Server on port 3000

Student REST API on port 4000

In-memory student array

All required routes implemented

Proper error handling

JSON responses

👨‍💻 Author
Haleluya Desalegn

📅 Submission Date
December 9, 202