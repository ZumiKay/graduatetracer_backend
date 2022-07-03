const express = require('express')
const app = express()
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const Route = require('../Route/route')
const { role } = require('../Model')
const cookie = require('cookie-session')
require('dotenv').config()

//middleware
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.text())
app.use(express.query())
app.use(helmet())
app.use(morgan('dev'))
app.use(cookie({
    name: "user",
    secret: process.env.JWT_SECRET,
    httpOnly: true
}))

// 

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, }).then(() => {
    console.log("Connected DB")
    initail()
}).catch(err => {
    console.log(err)
    process.exit()
})
app.listen(process.env.PORT || 8000, console.log("Server run on " + process.env.PORT))
app.use('/api', Route)

function initail() {
    role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console(err)
                }
            })
        }
    })
}