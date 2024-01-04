const express = require('express');
const router = express.Router();
const { auth, isadmin } = require('../middleware/auth')
const { AddStudent, UpdateStudent, DeleteStudent, CreateStaff, UpdateStaff, DeleteStaff, } = require('../controller/staff.controller')


//Add staff 
router.post('/', auth, isadmin, CreateStaff);

// Update staff 
router.patch('/:id', auth, UpdateStaff);

// Delete staff 
router.delete('/:id', auth, DeleteStaff);

//Add Student
router.post('/students', auth, AddStudent);

// Update Student 
router.patch('/students/:id', auth, UpdateStudent);

// Delete Student
router.delete('/students/:id', auth, DeleteStudent);

module.exports = router