/**
 * @path /api/user/
 * Requirements:
 * Create accounts, Update, recover account users, delete accounts
 * * for create accounts: personal contact info, social profiles, etc...
 * Add user info for cv:
 *      education
 *      Courses/certifications
 *      skills
 *      exp work
 *      buy history
 * 
 */

 const { Router } = require('express')
 const {
    newUser,
    getUsers,
    deleteUser,
    updateUser
} = require('./../controllers/user')
const { body } = require('express-validator')
const { verifyToken, verifyRole } = require('../middlewares/auth')

 const router = Router()
 
 //New user
 router.post('/',[
    //check valid email
    body('email').isEmail(),
    //password, at least 1 lowercase and 1 uppercase, min 8chars
    body('password', 'La contraseña debe terner al menos 1 mayuscula, 1 minuscula y un caracter especial').isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
 ], newUser)



 //List users,only for admin
 router.get('/list-users', [verifyToken, verifyRole], getUsers)
 //delete user, only for admin
 router.delete('/:id', [verifyToken, verifyRole], deleteUser)
 //update user Data, is the more complex route here
 router.put('/:id', [verifyToken], updateUser)


 module.exports = router