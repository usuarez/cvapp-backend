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
const {generatePdf, listTemplates, getBase64Pdf} = require('./../controllers/templates')
const { body } = require('express-validator')
const { verifyToken } = require('../middlewares/auth')
const cors = require('cors')
const router = Router()
 
router.use(cors())

 //New user
 router.post('/',[
    //check valid email
    body('email').isEmail(),
    //password, at least 1 lowercase and 1 uppercase, min 8chars
    body('password', 'La contraseña debe tener al menos 1 mayuscula, 1 minuscula y un numero').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\.\*])(?=.{8,})/, "i")
 ], newUser)

//get user data
router.post('/my-data', [verifyToken], getUserData)
 
 //update user Data, is the more complex route here
 router.put('/:id', [verifyToken], setUserData)

 router.delete('/deleteOne', [verifyToken], deleteUserData)

 router.post('/genpdf', [verifyToken], generatePdf)

 router.get('/templates', listTemplates)

 //use cors middleware to fix rejection download
 router.get('/download/:id/:template', cors({
   "origin": "*",
   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
   "preflightContinue": false,
   "optionsSuccessStatus": 204
 }), downloadPdf)

 router.get('/preview/:id/:template', getBase64Pdf)

 module.exports = router