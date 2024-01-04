const Department = require('../model/department.model')

const CreateDepartment = async (req, res) => {
    let department = new Department(req.body);

    try {
        await department.save()
        res.status(201).send(department)
    } catch (e) {
        res.status(400).send(e)
    }
};

const UpdateDepartment = async (req, res) => {
    const departmentId = req.params.id;

    try {
        const department = await Department.findById(departmentId);

        if (!department) {
            return res.status(404).send({ error: 'Department not found' });
        }

        Object.assign(department, req.body);
        await department.save();

        res.send(department);
    } catch (e) {
        res.status(400).send(e);
    }
};

const DeleteDepartment = async (req, res) => {
    const departmentId = req.params.id;

    try {
        const department = await Department.findByIdAndDelete(departmentId);

        if (!department) {
            return res.status(404).send({ error: 'Department not found' });
        }

        res.send(department);
    } catch (e) {
        res.status(500).send(e);
    }
};

module.exports = {
    CreateDepartment,
    UpdateDepartment,
    DeleteDepartment
};