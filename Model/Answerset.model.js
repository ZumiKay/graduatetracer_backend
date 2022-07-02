const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswersetSchema = new Schema({
    user: {
        type: String,
        require: true
    },
    Form_id: {
        type: Schema.Types.ObjectId,
        ref: "Form",
    },
    Responses: [{
        type: Object,
        required: true
    }]
})

const Answerset = mongoose.model("Answerset", AnswersetSchema)
module.exports = Answerset