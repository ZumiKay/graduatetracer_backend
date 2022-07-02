const mongoose = require('mongoose')
const Scehma = mongoose.Schema

const students = new Scehma({
    Email: {
        type: String,
        required: true

    },
    Firstname: {
        type: String,
        required: true

    },
    Lastname: {
        type: String,
        required: true
    },


})

const student = mongoose.model('student', students)
module.exports = student