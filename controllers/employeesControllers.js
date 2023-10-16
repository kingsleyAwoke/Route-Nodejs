const { parse } = require('date-fns');

const data = {
    employees: require('../data/employees.json'),
    setEmployees: function (data) { this.employees = data }
}

const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

const createNewEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        firstName: req.body.firstName,
        lastNameName: req.body.lastNameName
    }

    if (!newEmployee.firstName || !newEmployee.lastName) {
        return res.status(404).json({'message': 'First and Last names are required.'});
    }

    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.employees);
}

const updateEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id == parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({"message": `Employee ID ${req.body.id} not found`});
    }
    if (req.body.firstName) emp.firstName = req.body.firstName;
    if (req.body.lastName) emp.firstName = req.body.lastName;
    const filterArray = data.employees.filter(emp => emp.id !== parent(req.body.id));
    const unsortedArray = [...filterArray, employee];
    data.setEmployees(unsortedArray.sort((a,b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.employees);
}

const deleteEmployee = (req, res) => {
    const employee = data.emp.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({"message": `Employee ID ${req.body.id} not found`});
    }
    const filterArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    data.setEmployees([...filterArray]);
    res.json(data.employees);
}

const getEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) {
        return res.status(400).json({"message": `Employee ID ${req.params.id} not found`});
    }
    res.json(employee);
}


module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}