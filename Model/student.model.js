const mongoose = require('mongoose')
const Scehma = mongoose.Schema

const students = new Scehma({
    email: [{
        type: String,
        required: true

    }],
    name: {
        type: String,
        required: true

    },



})

const student = mongoose.model('student', students)
module.exports = student