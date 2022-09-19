const Employee = require('../models/Employee');

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({
            status: 'success',
            results: employees.length,
            data: {
                employees
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.createNewEmployee = async (req, res) => {
    try {
        const newEmployee = await Employee.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                employee: newEmployee
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
};

exports.findById = async (req, res) => {
    const id = req.params.id
    try {
        const employee = await Employee.findById(id);
        res.status(200).json({
            status: 'success',
            data: {
                employee: employee
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.deleteEmployee = async (req, res) => {
    const id = req.params.id
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        res.status(200).json({
            status: 'success',
            data: {
                deletedEmployee: deletedEmployee
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.updateEmployee = async (req, res) => {
    const id = req.params.id
    try {
        await Employee.findByIdAndUpdate(id, req.body);
        res.status(200).json({
            status: 'success',
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}
