const mongoose = require('mongoose')
const validator = require('validator')

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        trim: true
    },
    department: {
        type: String,
        trim: true
    },
    batch: {
        type: String,
        trim: true
    },
    currentSemester: {
        type: Number,
        trim: true
    },
    date: {
        type: Date,  
        required: false,
    }
})

const StudentModule = mongoose.model('StudentData', taskSchema);

module.exports = StudentModule;
