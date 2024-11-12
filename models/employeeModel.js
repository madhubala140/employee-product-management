const employees = [];

class Employee {
  constructor(id, name, salary) {
    this.id = id;
    this.name = name;
    this.salary = salary;
  }
}

module.exports = { employees, Employee };
