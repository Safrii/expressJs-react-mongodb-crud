const express = require('express')

const employeeController = require('../controllers/employeeController');

const router = express.Router();

router.route('/employees').get(employeeController.getAllEmployees);
router.route('/employee/:id').get(employeeController.findById)
router.route('/employee').post(employeeController.createNewEmployee);
router.route('/employee/:id').put(employeeController.updateEmployee);
router.route('/employee/:id').delete(employeeController.deleteEmployee);


module.exports = router;