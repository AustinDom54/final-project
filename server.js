//const app = require('express')()
const express = require('express')
require('dotenv').config()

const { dbConnection } = require('./database/config')
const routerIndex = require('./routes')
const { routerDev } = require('./routes/db')
const { engine } = require('express-handlebars')
const { routerPosts } = require('./routes/posts')


// Inicializo la aplicación de express
const app = express()

// Conectar a la DB
dbConnection()

// Template Engine
app.engine('hbs', engine({ extname: '.hbs' }))

// Middlewares
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set('view engine', 'hbs')
app.set('views', './views')

// Routes
app.use('/', routerIndex)
app.use('/', routerDev)
app.use('/', routerPosts)

const PORT = process.env.PORT
app.listen(PORT, err => {
	if (err) throw new Error('Ocurrió un problema con el servidor: ', err)
	console.log(`Servidor express escuchando en el puerto ${PORT}`)
})