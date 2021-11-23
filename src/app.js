var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

// Parse request bodies
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(cookieParser())

// Configure CORS Middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5001', 'https://ucudal.github.io/PW_2021_Website-3ettilina/')
  res.setHeader('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Credentials', true)

  next()
});

app.get('/perfil', function(req, res) {
  const details = require("./data/me.json")
  res.send(details)
});

app.get('/experiencia-laboral', function(req, res) {
  const exp = require('./data/job_experience.json')
  res.send(exp)
})

app.get('/estudios', function(req, res) {
  const studies = require('./data/education.json')
  res.send(studies)
})

app.get('/habilidades', function(req, res) {
  const skills = require('./data/skills.json')
  res.send(skills)
})

app.post('/enviar-formulario', function(req, res) {
  const details = req.body
  console.log(details.nombreContacto)
  if (!details.nombreContacto) {
    res.status(400).send('Falta el nombre de contacto')
  } else {
    res.cookie("PW_2021-CV_Contacto", details.nombreContacto, {httpOnly: true})
    res.send(details.nombreContacto)
  }
});

// 404 handling
app.get('*', function(req, res){
  res.status(404).send('404 - No fue encontrado');
});

app.listen(process.env.PORT || 3000, (a) => {
  console.log("Servidor disponible en http://localhost:3000")
});

module.exports = app;