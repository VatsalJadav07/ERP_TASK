const express = require('express');
const router = express.Router();
const { auth, isadmin } = require('../middleware/auth')
const User = require('../model/user.model')
const { CreateStudent, UpdateStudent, DeleteStudent } = require('../controller/admin.controller')

//Add Admin
router.post('/', async (req, res) => {
    let admin = new User(req.body);
    try {
        await admin.save()
        const token = await admin.generateAuthToken()
        res.status(201).send({ admin })
    } catch (e) {
        res.status(400).send(e)
    }
})

//Add Student
router.post('/students', auth, isadmin, UpdateStudent);

// Update Student 
router.patch('/students/:id', auth, CreateStudent);

// Delete Student
router.delete('/students/:id', auth, DeleteStudent);

module.exports = router