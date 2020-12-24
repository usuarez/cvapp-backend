/**
 * @path /api/auth/
 * Requirements:
 *  Login users. renew sesion jwt
 */


 const {Router} = require('express')
 const { check } = require('express-validator')
const { login, renewToken } = require('../controllers/auth')
const { verifyToken, verifyRole } = require('../middlewares/auth')
const router = Router()

router.post('/', [
    //check valid email
    check('email').isEmail(),
    //password, at least 1 lowercase and 1 uppercase, min 8chars
    check('password', 'La contraseña debe terner al menos 1 mayuscula, 1 minuscula y un caracter especial').isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
] ,login)
router.post('/renew-token', [verifyToken], renewToken)


module.exports = router