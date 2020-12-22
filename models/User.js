const {Schema, model} = require('mongoose')


    ProfessionSchema = Schema({
        title: {
            type: String,
            required: true
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
            required: true
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
            required: true
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
            required: true
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
    phone: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true
    },
    birth: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    profession: [ProfessionSchema],
    experience: [ExperienceSchema],
    skills: [SkillSchema],
    certifications: [CertificationSchema]
})

module.exports = model('User', UserSchema)