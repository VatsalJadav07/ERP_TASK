const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth')
const { AddAttendance, UpdateAttendance } = require('../controller/attendance.controller')

// Add Attendance
router.post('/', auth, AddAttendance);

// Update Attendance
router.patch('/:id', auth, UpdateAttendance);

module.exports = router