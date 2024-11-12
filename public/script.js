// Function to fetch and display employees
async function getEmployees() {
    try {
        const response = await fetch('/api/employees');
        const employees = await response.json();

        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML = ''; // Clear previous output

        if (employees.length === 0) {
            outputDiv.innerHTML = '<p>No employees found.</p>';
        } else {
            outputDiv.innerHTML = '<h3>Employee List</h3>';
            outputDiv.innerHTML += `
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Salary</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${employees.map(emp => `
                            <tr>
                                <td>${emp.id}</td>
                                <td>${emp.name}</td>
                                <td>${emp.salary}</td>
                                <td>
                                    <button onclick="deleteEmployee(${emp.id})">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        }
    } catch (error) {
        console.error('Error fetching employees:', error);
        document.getElementById('output').innerHTML = '<p style="color:red;">Failed to load employees.</p>';
    }
}

// Function to add a new employee
document.getElementById('addEmployeeForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const salary = document.getElementById('salary').value;
    
    const newEmployee = { name, salary: parseFloat(salary) };
    
    try {
        const response = await fetch('/api/employees', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEmployee)
        });
        
        const employee = await response.json();
        alert(`Employee added: ${employee.name}`);
        getEmployees(); // Reload employee list after adding
    } catch (error) {
        alert('Error adding employee');
        console.error(error);
    }
});

// Function to delete an employee
async function deleteEmployee(id) {
    try {
        const response = await fetch(`/api/employees/${id}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        alert(result.message);
        getEmployees(); // Reload employee list after deletion
    } catch (error) {
        alert('Error deleting employee');
        console.error(error);
    }
}
