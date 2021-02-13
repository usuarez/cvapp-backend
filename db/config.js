const mongoose = require('mongoose')

const dbconnection = async () => {
    try {
        mongoose.connect(
            process.env.DB_CNN,
            {
                useNewUrlParser: true, 
                useCreateIndex:true, 
                useUnifiedTopology: true,
                useFindAndModify: false,
            }
            )
            console.log('Conexion establecida a la nube')
    } catch (error) {
        console.log(error)
        throw new Error('No se pudo establecer conexion con la base de datos')
    }
}

module.exports = {dbconnection}