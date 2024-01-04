const Student = require('../model/student.model');
const Attendance = require('../model/attendance.model');

const GetAnalytics = async (req, res) => {
    try {
        const result = await Student.aggregate([
            { $group: { _id: { year: '$batch', department: '$department' }, totalStudents: { $sum: 1 } } },
            { $group: { _id: '$_id.year', maxTotalStudents: { $max: '$totalStudents' }, branches: { $push: { department: '$_id.department', totalStudents: '$totalStudents' } } } },
            { $sort: { _id: 1 } },
        ]);

        res.send(result);
    } catch (err) {
        res.status(500).send(err);
    }
};

const GetAbsentStudents = async (req, res) => {
    try {
        const { batch, branch, semester, specificDate } = req.query;

        const query = { ...(batch && { batch }), ...(branch && { branch }), ...(semester && { semester }), isPresent: false, date: specificDate };

        const absentStudents = await Attendance.aggregate([
            { $match: query },
            { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }, students: { $push: '$studentId' } } },
            { $project: { _id: 0, date: '$_id.date', students: 1 } },
        ]);

        res.json(absentStudents);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
};

const GetLowAttendanceStudents = async (req, res) => {
    try {
        const { batch, branch, semester, specificDate } = req.query;
        const query = { ...(batch && { batch }), ...(branch && { branch }), ...(semester && { semester }), ...(specificDate && { date: specificDate }) };

        const totalClasses = 2;
        const attendanceThreshold = 0.75;

        const lowAttendanceStudents = await Attendance.aggregate([
            { $match: query },
            { $group: { _id: '$studentId', totalClasses: { $sum: 1 } } },
            { $match: { totalClasses: { $lt: totalClasses * attendanceThreshold } } },
            { $project: { _id: 0, studentId: '$_id' } },
        ]);

        res.json(lowAttendanceStudents);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
};

const GetVacantSeats = async (req, res) => {
    try {
        const { batch, branch } = req.query;
        const filter = { ...(batch && { batch }), ...(branch && { department: branch }) };
        const totalStudents = await Student.countDocuments(filter);
        const totalStudentsIntake = 2000;
        const availableIntake = totalStudentsIntake - totalStudents;

        const branches = await Student.aggregate([
            { $match: filter },
            { $group: { _id: '$department', totalStudents: { $sum: 1 } } },
            { $project: { _id: 0, department: '$_id', totalStudents: 1 } },
        ]);

        const branchesMap = branches.reduce((acc, branch) => {
            acc[branch.department] = {
                totalStudents: branch.totalStudents,
                totalStudentsIntake: 1000,
                availableIntake: 1000 - branch.totalStudents,
            };
            return acc;
        }, {});

        const result = { batch, totalStudents, totalStudentsIntake, availableIntake, branches: branchesMap };
        res.json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    GetAnalytics,
    GetAbsentStudents,
    GetLowAttendanceStudents,
    GetVacantSeats,
};