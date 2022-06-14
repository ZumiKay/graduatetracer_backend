const mongoose = require('mongoose')
Promise = global.Promise
const db = {}
db.mongoose = mongoose
db.student = require('./student.model')

module.exports = db