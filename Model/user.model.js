const mongoose = require('mongoose')
const Scehma = mongoose.Schema

const UserSchema = new Scehma({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Scehma.Types.ObjectId,
        ref: "role"
    },
    token: {
        type: String,
    }
})

const User = mongoose.model("user", UserSchema)
module.exports = User