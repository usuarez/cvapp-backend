const mongoose = require('mongoose')

const dbconnection = async () => {
    try {
        mongoose.connect(
            process.env.DB_CONNECT,
            {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true}
            )
            console.log('Conexion establecida a cvplusdb')
    } catch (error) {
        console.log(error)
        throw new Error('No se pudo establecer conexion con la base de datos')
    }
}

module.exports = {dbconnection}