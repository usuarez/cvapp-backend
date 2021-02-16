const express = require('express')
const path = require('path')
require('dotenv').config()
const cors = require('cors')
const { dbconnection } = require('./db/config')
const app = express()

//read and parse the req.body
app.use(express.json())
//connect database
dbconnection()

//enable /public folder
app.use(express.static( path.resolve( __dirname, './public') ) )

//Express CORS
app.use(cors())
//CORS config
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
//Routes
app.use('/api/user', require('./routes/user'))
app.use('/api/auth', require('./routes/auth'))

app.listen(process.env.PORT, ()=>{console.log(`API corriendo en el puerto ${process.env.PORT}`)})