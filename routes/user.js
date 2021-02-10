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
 * 
 */

 const { Router } = require('express')
 const {
    newUser,
    setUserData,
    getUserData,
    deleteUserData,
    downloadPdf
} = require('./../controllers/user')
const {generatePdf, listTemplates} = require('./../controllers/templates')
const { body } = require('express-validator')
const { verifyToken } = require('../middlewares/auth')

 const router = Router()
 
 //New user
 router.post('/',[
    //check valid email
    body('email').isEmail(),
    //password, at least 1 lowercase and 1 uppercase, min 8chars
    body('password', 'La contraseña debe tener al menos 1 mayuscula, 1 minuscula y un numero').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\.\*])(?=.{8,})/, "i")
 ], newUser)


//get user data
router.post('/my-data', [verifyToken], getUserData)
 //List users,only for admin, ready but disaled for now
 //router.get('/list-users', [verifyToken, verifyRole], getUsers)
 //delete user, only for admin
 //router.delete('/:id', [verifyToken, verifyRole], deleteUser)
 //update user Data, is the more complex route here
 router.put('/:id', [verifyToken], setUserData)

 router.delete('/deleteOne', [verifyToken], deleteUserData)

 router.post('/genpdf', [verifyToken], generatePdf)

 router.get('/templates', listTemplates)

 router.get('/download/:id', downloadPdf)

 module.exports = router