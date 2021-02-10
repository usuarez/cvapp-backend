const {response} = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')


const verifyToken = (req,res = response,next) => {
    //get token from headers
    let token = req.header('x-token')
    if(!token) res.status(401).json({ok:false, msg: 'usuario no autenticado'})

    try {
        const payload = jwt.verify(token, process.env.SECRET_JWT_SEED)
        
        req.uid = payload.uid


    } catch (error) {
        res.status(401).json({ok:false, msg: 'token no valido'})
    }

    next()
}

const verifyRole = async(req,res = response,next) => {
    let userId = req.uid
    let user = await User.findById(userId)
    let role = user.role
    if (role !== 'ADMIN_ROLE') {
        return res.status(403).json({
            ok: false,
            message: 'no tienes permisos para realizar esta accion'
        })
    }
    next()
}

module.exports = { verifyToken, verifyRole }