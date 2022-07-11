const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FormSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    // Department: {
    //     type: String,
    // },
    contents: [{
        type: Object,

    }],


}, { timestamps: true })

const Form = mongoose.model('Form', FormSchema)

module.exports = Form