const { employees, Employee } = require('../models/employeeModel');

// Add Employee
exports.addEmployee = (req, res) => {
  const { id, name, salary } = req.body;
  const employee = new Employee(id, name, salary);
  employees.push(employee);
  res.status(201).json(employee);
};

// Delete Employee
exports.deleteEmployee = (req, res) => {
  const { id } = req.params;
  const index = employees.findIndex(emp => emp.id == id);
  if (index !== -1) {
    employees.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Employee not found");
  }
};

// Get Employee By Name
exports.getEmployeeByName = (req, res) => {
  const { name } = req.params;
  const employee = employees.find(emp => emp.name.toLowerCase() === name.toLowerCase());
  res.json(employee || "No employee found");
};

// Get Employee with Highest Salary
exports.getHighestSalaryEmployee = (req, res) => {
  if (employees.length === 0) return res.status(404).send("No employees available");
  const highestSalaryEmployee = employees.reduce((max, emp) => emp.salary > max.salary ? emp : max);
  res.json(highestSalaryEmployee);
};
