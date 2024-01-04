const Attendance = require('../model/attendance.model')
const Student = require('../model/student.model')

const AddAttendance = async (req, res) => {
    try {
        const { studentId } = req.body;
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(400).send("Student Not Found");
        }

        const attendance = new Attendance(req.body);
        const result = await attendance.save();

        res.json(result);
    } catch (e) {
        res.status(400).send(e);
    }
};

const UpdateAttendance = async (req, res) => {
    const attendanceId = req.params.id;

    try {
        const attendance = await Attendance.findById(attendanceId);

        if (!attendance) {
            return res.status(404).send({ error: 'Attendance record not found' });
        }

        Object.assign(attendance, req.body);
        const result = await attendance.save();

        res.json(result);
    } catch (e) {
        res.status(400).send(e);
    }
};

module.exports = {
    AddAttendance,
    UpdateAttendance,
};