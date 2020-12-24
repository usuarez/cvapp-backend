const {response} = require('express')
const User = require('./../models/User')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');


const newUser = async (req, res = response) => {
    //validation results
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    //validate if account exists
    const {email} = req.body
    const isUser = await User.findOne({email})
    if (isUser) (res.json({ok:false, message: "El email ya está registrado"}))

    
    try {
        const user = new User(req.body)
        const salt = bcrypt.genSaltSync(10)
        user.password = bcrypt.hashSync(req.body.password, salt)
        await user.save()
        user.password = ':)'
        res.status(202).json({ok:true, user})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'No se realizó el registro, error interno del servidor. Por favor verifique sus datos e intente de nuevo'
        })
    }
}

const updateUser = async (req, res = response) => {
    //here the cv data, manage with switch the data
    const id = req.params.id
    //update cv data
    const updateResume = (update) => {
            User.findByIdAndUpdate(id, update, {new: true, runValidators: true}, (err, userUpdated)=>{
                if (err) { return res.status(400).json({ ok: false, err }) }
                res.json({ok:true, userUpdated})
            })
        }
    
    //Profession
    if (req.body.profession) {
        const update = {$push: {profession: req.body.profession}}
        updateResume(update)
    }
    //experience
    else if (req.body.experience) {
        const update = {$push: {experience: req.body.experience}}
       updateResume(update)
    }
    //skills
    else if (req.body.skill) {
        const update = {$push: {skills: req.body.skill}}
       updateResume(update)
    }
    //certifications
    else if (req.body.certification) {
        const update = {$push: {certifications: req.body.certification}}
       updateResume(update)
    }
    //if data !== resume data then the info is the account info(email, phone, etc...)
    else {
        const update = req.body
        User.findByIdAndUpdate(id, update, {new: true, runValidators: true}, (err, userUpdated)=>{
            if (err) { return res.status(400).json({ ok: false, err }) }
            res.json({ok:true, userUpdated})
        })
    }

}
//list the registred users, only admin
const getUsers = async (req, res = response) => {
    let from = Number(req.query.from) || 0
    let limite = Number(req.query.limite) || 0

    User.find({disabled: false}, 'name email')
            .skip(from)
            .limit(limite)
            .exec((err, users) => {
               if (err) return res.status(400).json({ ok: false, err })
               
               User.countDocuments({disabled: false}, (err, count)=>{
                   res.json({
                       ok: true,
                       users,
                       count
                   })

               })
           })
}

//No delete data, only disable the account
const deleteUser = async (req, res = response) => {
    let id = req.params.id
    let update = {disabled: true}
    User.findByIdAndUpdate(id, update, {new: true}, (err, userDB)=> {
        if (err) return res.status(400).json({ ok: false, err })
        
        res.json({
            ok: true,
            user: userDB
        })
    })
}




module.exports = {
    newUser,
    getUsers,
    deleteUser,
    updateUser
}