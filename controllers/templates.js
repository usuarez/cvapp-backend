const {response} = require('express')
const fs = require('fs');
const User = require('./../models/User')
const pdf = require('html-pdf')
const path = require('path') 
const pdf2base64 = require('pdf-to-base64');

//generate pdf in the server
const generatePdf = (req, res = response) => {
    const {uid, pdfData} = req.body.data
    User.findById(uid).exec((err, user) => {
        if(err) { return err }
        let userData = user
        pdfData.userData = userData
    const content = require(`../templates/${pdfData.templateName}`)
    //content(userDataObject)
    const htmlHeadStructure = `
            <!DOCTYPE html>
            <html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://cvplus.herokuapp.com/css/bootstrap.css">
            <link rel="stylesheet" href="https://cvplus.herokuapp.com/css/global.css">
            <title>Template</title>
            <style>
                .accent-bg { background-color: ${pdfData.accentColor || 'white'};}
                .accent-text { color: ${pdfData.accentColor || 'white'};}
                @import ${pdfData.fonts[0].link}
                ${(!!pdfData.fonts[1]) ? `@import ${pdfData.fonts[1].link}` : '' }
                html, body > * {font-family: ${ (!!pdfData.fonts[1]) ? pdfData.fonts[1].family : pdfData.fonts[0].family };}
                h1,h2,h3,h4,h5,h6 {font-family: ${pdfData.fonts[0].family};}
            </style>
        </head><body class="simple main"><div id="pageHeader"></div>`
    const htmlEndStructure=`<div id="pageFooter"></div></body></html>`
    
    templ = `
        ${htmlHeadStructure}
        ${content(userData)}
        ${htmlEndStructure}
    `
    fs.readdir('./public/resumes', (err,resumes)=>{
    console.log(resumes)
    resumes.forEach(resume=>{
        if(resume.includes('.pdf')) {
            try {
                fs.unlinkSync(resume)
                console.log('Resume storage cleared')
              } catch(err) {
                console.error('Something wrong happened removing the file', err)
              }
        }
    })
    })
    pdf.create(templ, {
        "header": {"height": "10mm"}, 
        "footer": {"height": "16mm"}
        }).toFile(`./public/resumes/${uid}-${pdfData.templateName}.pdf`, (err, res) => {
        if(err) return res.status(400).json({ok:false, err})
        })
        return res.json({ok:true, message: 'pdf creado con exito', uri: path.resolve(`./public/resumes/${uid}-${pdfData.templateName}.pdf`)})

    })
}

const listTemplates = (req, res = response) => {
    fs.readdir('./templates', (err, filesExt)=>{
        if(err) {res.json({err})}
        else {
            const files = []
            filesExt.forEach(file => {files.push(file.split('.')[0])})
            res.json({templates: files})
        }
    });
}



const getBase64Pdf = (req, res = response) => {
    const {id, template} = req.params
    const file = path.resolve(__dirname+`/../public/resumes/${id}-${template}.pdf`)
    
    console.log(file)
    pdf2base64(file)
    .then( (response) => { res.status(200).json({ok: true, pdf: response}) } )
    .catch( (error) => { res.status(400).json({ok: false, error}) } )
}

module.exports = {generatePdf, listTemplates, getBase64Pdf}