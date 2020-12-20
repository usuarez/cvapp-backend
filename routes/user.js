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

 const router = Router()

 //New user
 router.post('/', newUser)
 //List users,only for admin
 router.get('/list-all', getUsers)
 //delete user, only for admin
 router.delete('/:id', deleteUser)
 //update user Data, is the more complex route here
 router.put('/:id', updateUser)


 module.exports = router