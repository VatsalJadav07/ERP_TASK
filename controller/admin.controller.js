const Student = require('../model/student.model')
const Attendance = require('../model/attendance.model')

const CreateStudent = async (req, res) => {
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
        const updates = Object.keys(req.body);
        updates.forEach(update => student[update] = req.body[update]);

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

         // Delete associated attendance records
        await Attendance.deleteMany({ studentId });
        res.send(student);
    } catch (e) {
        res.status(500).send(e);
    }
};

module.exports = {
    CreateStudent,
    UpdateStudent,
    DeleteStudent,
};
