const express = require('express')
//const bodyparser = require('body-parser')
const path = require('path')
require('dotenv').config()
const { dbconnection } = require('./db/config')
const app = express()
//read and parse the body
app.use(express.json())
//connect database
dbconnection()

//app.use('/api/auth', require('./routes/auth'))
//app.use('/api/review', require('./routes/reviews'))
app.use('/api/user', require('./routes/user'))
//app.use('/api/survey', require('./routes/surveys'))

app.listen(process.env.PORT, ()=>{console.log(`API corriendo en el puerto ${process.env.PORT}`)})