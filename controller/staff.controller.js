const Student = require('../model/student.model');
const User = require('../model/user.model')
const Attendance = require('../model/attendance.model')

const CreateStaff = async (req, res) => {
    let staff = new User({
        ...req.body,
        role: 'staff'
    });

    try {
        await staff.save()
        const token = await staff.generateAuthToken()

        res.status(201).send({ staff })
    } catch (e) {
        res.status(400).send(e)
    }
};

const UpdateStaff = async (req, res) => {
    const staffId = req.params.id;

    try {
        const staff = await User.findById(staffId);

        if (!staff) {
            return res.status(404).send({ error: 'Staff member not found' });
        }

        Object.assign(staff, req.body);
        await staff.save();

        res.send(staff);
    } catch (e) {
        res.status(400).send(e);
    }
};

const DeleteStaff = async (req, res) => {
    const staffId = req.params.id;

    try {
        const staff = await User.findByIdAndDelete(staffId);

        if (!staff) {
            return res.status(404).send({ error: 'Staff member not found' });
        }

        // Delete associated attendance records
        await Attendance.deleteMany({ studentId });
        res.send(staff);
    } catch (e) {
        res.status(500).send(e);
    }
};

const AddStudent = async (req, res) => {
    let student = new Student(req.body);

    try {
        await student.save()

        res.status(201).send(student)
    } catch (e) {
        res.status(400).send(e)
    }
};

const UpdateStudent = async (req, res) => {
    const studentId = req.params.id;

    try {
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).send({ error: 'Student not found' });
        }

        Object.assign(student, req.body);
        await student.save();

        res.send(student);
    } catch (e) {
        res.status(400).send(e);
    }
};

const DeleteStudent = async (req, res) => {
    const studentId = req.params.id;

    try {
        const student = await Student.findByIdAndDelete(studentId);

        if (!student) {
            return res.status(404).send({ error: 'Student not found' });
        }

        res.send(student);
    } catch (e) {
        res.status(500).send(e);
    }
};

module.exports = {
    AddStudent,
    UpdateStudent,
    DeleteStudent,
    CreateStaff,
    UpdateStaff,
    DeleteStaff,
};
