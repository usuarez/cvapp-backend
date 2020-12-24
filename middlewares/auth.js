const jwt = require('jsonwebtoken')


const verifyToken = (req,res,next) => {
    //get token from headers
    let token = req.get('token')
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }
        req.user = decoded.user
        next()
    })
}

const verifyRole = (req,res,next) => {
    let user = req.user
    if(!user.role) user.role = 'USER'
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