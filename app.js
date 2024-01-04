const express = require('express');
const { mongoDB } = require('./DB/database')
const adminRoutes = require("./Routes/admin.route")
const staffRoutes = require('./Routes/staff.route');
const departmentRoutes = require('./Routes/department.route')
const attendanceRoutes = require('./Routes/attendance.route');
const analyticsRoutes = require('./Routes/analytics.route')
const app = express();

const port = 3000; // You can choose any available port

// mongodb connect
mongoDB()
app.use(express.json())

// Define a admin route
app.use('/admin', adminRoutes);

// Define a staff route
app.use('/staff', staffRoutes);

// Define a department route
app.use('/department', departmentRoutes);

// Define a attendance route
app.use('/attendance', attendanceRoutes);

// Define a analytics route
app.use('/analytics', analyticsRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});