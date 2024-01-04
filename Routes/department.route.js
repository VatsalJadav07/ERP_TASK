const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { CreateDepartment, UpdateDepartment, DeleteDepartment } = require('../controller/department.controller')

//Add Departments
router.post('/', auth, CreateDepartment);

// Update Department 
router.patch('/:id', auth, UpdateDepartment);

// Delete Departments
router.delete('/:id', auth, DeleteDepartment);

module.exports = router