const {response} = require('express')
const User = require('./../models/User')


const newUser = async (req, res = response) => {
    //need more validation
    const {email} = req.body
    const isUser = await User.findOne({email})
    if (isUser) (res.json({ok:false, message: "El email ya está registrado"}))
    try {
        const user = new User(req.body)
        await user.save()
        res.status(202).json({ok:true, data: req.body, user})
    } catch (error) {
        console.log(error)
        throw new Error('Algo salio mal')
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
    if (req.body.experience) {
        const update = {$push: {experience: req.body.experience}}
       updateResume(update)
    }
    //skills
    if (req.body.skill) {
        const update = {$push: {skills: req.body.skill}}
       updateResume(update)
    }
    //certifications
    if (req.body.certification) {
        const update = {$push: {certifications: req.body.certification}}
       updateResume(update)
    }

}

const getUsers = async (req, res = response) => {}
const deleteUser = async (req, res = response) => {}





module.exports = {
    newUser,
    getUsers,
    deleteUser,
    updateUser
}