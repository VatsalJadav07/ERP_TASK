const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { GetAnalytics, GetAbsentStudents, GetLowAttendanceStudents, GetVacantSeats } = require('../controller/analytics.controller')

// analytics
router.get('/', auth, GetAnalytics);

// Absent Student
router.get('/absent', auth, GetAbsentStudents);

// Attendance is less than 75%
router.get('/lowAttendance', auth, GetLowAttendanceStudents);

//Vacant Seat
router.get('/vacantSeats', auth, GetVacantSeats);

module.exports = router;