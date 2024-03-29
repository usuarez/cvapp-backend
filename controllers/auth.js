const {response} = require('express')
const User = require('./../models/User')
const bcrypt = require('bcryptjs')
const { generateJwt } = require('../helpers/jwt');


const login = async(req, res = response)=>{
    try {
        const {email, password} = req.body
        //user exists validation
        const user = await User.findOne({email}) 
        if(!user) response.status(400).json({ok:false,message:'El usuario no existe'})
        //password match validation
        const validatePassword = bcrypt.compareSync(password, user.password)
        if(!validatePassword) {return res.status(400).json({ok:false,message:'Email o password incorrectos'})}
        //generating jwtoken
        const token = await generateJwt(user.id, user.name)
        res.status(200).json({ ok:true, user, token })
    } catch (error) {
        //error handling
        console.log(error)
        res.status(500).json({ ok:false, msg: 'Error inesperado, contacte al adm del sistema' })
    }
}

const renewToken = async(req, res = response)=>{
    console.log(req.body)
    const {id} = req.body
    let user = await User.findById(id)
    const token = await generateJwt(user.id, user.name)
    res.json({ok:true, uid: user.id, name: user.name, token})
}

module.exports = {login, renewToken}