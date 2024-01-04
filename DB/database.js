const mongoose = require('mongoose');

const dbUrl = 'mongodb://127.0.0.1:27017/ERP';

const mongoDB = async () => {
    await mongoose.connect(dbUrl, {
    }).then(() => {
        console.log('Connected to MongoDB')
    }).catch((e) => {
        console.log(e)
    })
}

module.exports = { mongoDB }