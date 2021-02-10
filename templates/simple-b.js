const moment = require('moment')
require('moment/locale/es')
const Avatar = require('../helpers/initial-avatars')


const content = (data) => (`
    <header class="fluid-container">
        <div class="center container">
            <div class="photo text-center">
            ${(data.hasOwnProperty('img') ) ? `<img src="${data.img || ''}" alt="">` : Avatar('rhaismar', {width: 120, bg: 'rgb(26, 156, 126)', textColor: '#3c3c3c'}) }
                
            </div>
            <h3 class="text-center">${data.name}</h3>
            <p class="text-center">${(data.hasOwnProperty('about')) ? data.about: ''}</p>

        </div>
    </header>
    <main class="container">
        <div class="row">
            <section class="content col-xs-offset-2 col-xs-5">
                <div class="experience main-section">
                    <h3 class="bold">Experiencia</h3>
                    ${data.experience.map(job => (
                        `<div class="main-section-item">
                            <h5 class="bold">${job.title}</h5>
                            <p>${job.entity}</p>
                            <span class="text_small">${moment(job.from).format('MMM YYYY')} - ${moment(job.to).format('MMM YYYY')}</span>
                        </div>`
                    )).flat().join('')}
                </div>
                <div class="education main-section">
                    <h3 class="bold">Educación</h3>
                    ${data.profession.map(edu => (
                        `<div class="main-section-item">
                            <h5 class="bold">${edu.title}</h5>
                            <p>${edu.entity}</p>
                            <span class="text_small">${moment(edu.from).format('MMM YYYY')} - ${moment(edu.to).format('MMM YYYY')}</span>
                        </div>`
                    )).flat().join('')}
                </div>
                <div class="courses main-section">
                    <h3 class="bold">Cursos</h3>
                    ${data.certifications.map(course => (
                        `<div class="main-section-item">
                            <h5 class="bold">${course.title}</h5>
                            <p>${course.entity}</p>
                            <span class="text_small">${moment(course.from).format('MMM YYYY')} - ${moment(course.to).format('MMM YYYY')}</span>
                        </div>`
                    )).flat().join('')}
                </div>
            </section>
            <aside class="side col-xs-3">
                <div class="contact">
                    <h3 class="bold">Contacto</h3>
                    <ul>
                        <li>${data.email}</li>
                        <li>${data.phone}</li>
                        <li>${data.address}</li>
                        
                    </ul>
                </div>
                <div class="skills">
                    <h3 class="bold">Habilidades</h3>
                    <div class="skill-list">
                    ${data.skills.map(skill => (
                        `<div class="skill">
                            <p>${skill.title}</p>
                            <div class="skill-bar">
                                <div class="skill-bar-fill ${skill.level}"></div>
                            </div>
                        </div>`
                    )).flat().join('') }

                    </div>
                </div>
            </aside>
        </div>

    </main>
    

` )
module.exports = content