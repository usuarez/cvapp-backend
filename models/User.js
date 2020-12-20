const {Schema, model} = require('mongoose')

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true
    },
    birth: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})

module.exports = model('Usuario', UserSchema)