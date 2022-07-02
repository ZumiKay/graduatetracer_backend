const mongoose = require('mongoose')
const Scehma = mongoose.Schema

const RoleSchema = new Scehma({
    name: {
        type: String,
        require: true
    }
})
const Role = mongoose.model('role', RoleSchema)
module.exports = Role