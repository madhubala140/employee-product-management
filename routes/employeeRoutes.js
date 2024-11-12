const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/api/employees', employeeController.addEmployee);
router.delete('/api/employees/:id', employeeController.deleteEmployee);
router.get('/api/employees/name/:name', employeeController.getEmployeeByName);
router.get('/api/employees/highest-salary', employeeController.getHighestSalaryEmployee);

module.exports = router;
