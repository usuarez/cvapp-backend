const {Schema, model} = require('mongoose')


    ProfessionSchema = Schema({
        title: {
            type: String,
            required: true,
            unique: true
        },
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date,
            required: true
        },
        entity: {
            type: String,
            required: true
        }
        
    })
    ExperienceSchema = Schema({
        title: {
            type: String,
            required: true,
            unique: true

        },
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date,
            required: true
        },
        entity: {
            type: String,
            required: true
        }
        
    })
    SkillSchema = Schema({
        title: {
            type: String,
            required: true,
            unique: true
        },
        from: {
            type: Date,
            required: true
        },
        level: {
            type: String,
            required: true
        }
        
    })
    CertificationSchema = Schema({
        title: {
            type: String,
            required: true,
            unique: true
        },
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date,
            required: true
        },
        entity: {
            type: String,
            required: true
        },
        certificate: {
            type: String
        }
        
    })


const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    phone: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true,
        unique: true
    },
    birth: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    google: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    role:{
        type: String,
        default: "USER"
    },
    profession: [ProfessionSchema],
    experience: [ExperienceSchema],
    skills: [SkillSchema],
    certifications: [CertificationSchema]  
})

//remove the password from the success return
UserSchema.methods.toJSON = function() {
    let user = this
    let userObject = user.toObject()
    delete userObject.password
    return userObject
}

module.exports = model('User', UserSchema)