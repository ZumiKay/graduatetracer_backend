const express = require('express')
const app = express()
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const Route = require('../Route/route')
const serverless = require('serverless-http')
require('dotenv').config()

//middleware
app.use(cors({
    origin: '*'
}))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.text())
app.use(express.query())
app.use(helmet())
app.use(morgan('dev'))
    // 

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, }).then(() => {
    console.log("Connected DB")

}).catch(err => {
    console.log(err)
    process.exit()
})
app.listen(process.env.PORT || 8000, console.log("Server run on " + process.env.PORT))
app.use('/api', Route)