const moment = require('moment')
require('moment/locale/es')
const Avatar = require('../helpers/initial-avatars')


const content = (data) => (`

<div class="container-fluid">
        <div class="row">

            <div class="col-xs-7 hello-main">
                <div class="experience main-section">
                    <h2 class="bold">Sobre mi</h2>
                    <div class="main-section-item">
                        <p>${(data.about) ? `${data.about}` : ''}</p>
                    </div>
                </div>
                <div class="experience main-section">
                ${(data.experience.length < 1 ) ? '' : `
                    <h3 class="bold">Experiencia</h3>
                    ${data.experience.map(job => (
                        `<div class="main-section-item">
                            <h5 class="bold">${job.title}</h5>
                            <p>${job.entity}</p>
                            <span class="text_small">${moment(job.from).format('MMM YYYY')} - ${moment(job.to).format('MMM YYYY')}</span>
                        </div>`
                    )).flat().join('')}
                    `}
                </div>
                <div class="education main-section">
                ${(data.profession.length < 1 ) ? '' : `
                    <h3 class="bold">Educación</h3>
                    ${data.profession.map(edu => (
                        `<div class="main-section-item">
                            <h5 class="bold">${edu.title}</h5>
                            <p>${edu.entity}</p>
                            <span class="text_small">${moment(edu.from).format('MMM YYYY')} - ${moment(edu.to).format('MMM YYYY')}</span>
                        </div>`
                    )).flat().join('')}
                    `}
                </div>
                <div class="courses main-section">
                ${(data.certifications.length < 1 ) ? '' : `
                    <h3 class="bold">Cursos</h3>
                    ${data.certifications.map(course => (
                        `<div class="main-section-item">
                            <h5 class="bold">${course.title}</h5>
                            <p>${course.entity}</p>
                            <span class="text_small">${moment(course.from).format('MMM YYYY')} - ${moment(course.to).format('MMM YYYY')}</span>
                        </div>`
                    )).flat().join('')}
                    `}
                </div>          
            </div>

            <div class="col-xs-5 hello-side">
            
            <div class="center container">
                <div class="photo text-center">
                ${ (!!data.img) ? `<img src="${data.img}" alt="" />` : '' }
                ${ (!data.img) ? Avatar(data.name, {width: 120, bg: 'rgb(26, 156, 126)', textColor: '#3c3c3c'}) : '' }
    
                </div>
                <h2 class=" thin text-center">${data.name}</h2>
                
            </div>
            <div class="contact">
                <h3 class="bold text-center">Contacto</h3>
                <ul>
                    
                    <li>${data.email}</li>
                    <li>${data.phone}</li>
                    <li>${data.address}</li>
                    
                </ul>
            </div>
            <div class="skills">
                ${ (data.skills.length < 1 ) ? '' :
                `<h3 class="thin text-center">Habilidades</h3>
                <div class="skill-list">
                ${data.skills.map(skill => (
                    `<div class="skill">
                        <p>${skill.title}</p>
                        <div class="skill-bar">
                            <div class="skill-bar-fill ${skill.level}"></div>
                        </div>
                    </div>`
                )).flat().join('') }

                </div>`
                }
                </div>
        </div>

        </div>
    </div>

` )
module.exports = content