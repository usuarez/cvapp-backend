const path = require('path') 
const mime = require('mime')
const {response} = require('express')
const User = require('./../models/User')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');
const { generateJwt } = require('../helpers/jwt');

//register a new user
const newUser = async (req, res = response) => {
    //validation results
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
      
      const password = "aA123456."
      const regexp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\.\*])(?=.{8,16})")
      let checking = regexp.test(password)
    return res.status(400).json({checking, errors: errors.array() });
  }
    //validate if account exists
    const {email} = req.body
    const isUser = await User.findOne({email})
    if (isUser) { return res.json({ok:false, message: "El email ya está registrado"})}

    
    try {
        const user = new User(req.body)
        const salt = bcrypt.genSaltSync(10)
        user.password = bcrypt.hashSync(req.body.password, salt)
        await user.save()

        const token = await generateJwt(user._id, user.name)
        user.password = ':)'
        res.status(202).json({ok:true, user, token})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'No se realizó el registro, error interno del servidor. Por favor verifique sus datos e intente de nuevo'
        })
    }
}

const deleteUserData = async (req, res = response) => {
    
    
    const {id, arr, arrItemId} = req.body
    const deleteFromArr = (id, update) => {
        User.findByIdAndUpdate({_id: id}, update, {new: true, useFindAndModify: true}, (err, user)=>{
            if (err) { return res.status(400).json({ ok: false, err }) }
            res.json({ok:true})
        })
    }
        if (arr === 'skills') {
            let update = { $pull : {skills: {_id: arrItemId} } }
            deleteFromArr(id, update)
        }
         else if (arr === 'profession') {
            let update = { $pull : {profession: {_id: arrItemId} } }
            deleteFromArr(id, update)
        }
         else if (arr === 'experience') {
            let update = { $pull : {experience: {_id: arrItemId} } }
            deleteFromArr(id, update)
        }
         else if (arr === 'certifications') {
            let update = { $pull : {certifications: {_id: arrItemId} } }
            deleteFromArr(id, update)
        }
        else {
            let update = { $unset : { [`${arr}`] : ""} }
            deleteFromArr(id, update)
        }
    
}


//Add any data of user
const setUserData = async (req, res = response) => {
    //here the cv data, manage with switch the data
    const id = req.params.id
    //update cv data
    const addToResume = (update) => {
            User.findByIdAndUpdate(id, update, {new: true, runValidators: true}, (err, userUpdated)=>{
                if (err) { return res.status(400).json({ ok: false, err }) }
                res.json({ok:true, userUpdated})
            })
        }
    
    //Profession
    if (req.body.profession) {
        const update = {$push: {profession: req.body.profession}}
        addToResume(update)
    }
    //experience
    else if (req.body.experience) {
        const update = {$push: {experience: req.body.experience}}
       addToResume(update)
    }
    //skills
    else if (req.body.skill) {
        const update = {$push: {skills: req.body.skill}}
       addToResume(update)
    }
    //certifications
    else if (req.body.certification) {
        const update = {$push: {certifications: req.body.certification}}
       addToResume(update)
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

//get user data
const getUserData = async (req, res = response) => {
    const id = req.body.uid
    User.findById(id).exec((err, user) => {
        if(err) { return res.status(400).json({ ok: false, err })}
        res.json({
            ok: true,
            user
            })   
    })
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

const downloadPdf = (req, res = response) => {
    const {id} = req.params
    const file = `./../resumes/${id}.pdf`; 
    console.log(file)
    res.download(file, 'myresume.pdf', (err)=>{
        if(err) res.json({err})
    })

}

module.exports = {
    newUser,
    getUsers,
    deleteUser,
    setUserData,
    getUserData,
    deleteUserData,
    downloadPdf
}