const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Employees array (in-memory database for simplicity)
let employees = [
    { id: 1, name: 'John Doe', salary: 50000 },
    { id: 2, name: 'Jane Smith', salary: 60000 },
    { id: 3, name: 'Alice Johnson', salary: 70000 }
];

// Route to get all employees
app.get('/api/employees', (req, res) => {
    res.json(employees);
});

// Route to add a new employee
app.post('/api/employees', (req, res) => {
    const { name, salary } = req.body;
    const newEmployee = {
        id: employees.length + 1, // Simple ID generation
        name,
        salary
    };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});

// Route to delete an employee by ID
app.delete('/api/employees/:id', (req, res) => {
    const { id } = req.params;
    employees = employees.filter(emp => emp.id != id);
    res.status(200).json({ message: `Employee with ID ${id} deleted` });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
