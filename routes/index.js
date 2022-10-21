const express = require('express')
const { getRootController } = require('../controllers')
const routerIndex = express.Router()

// Rutas de INDEX
routerIndex.get('/', getRootController)

module.exports = routerIndex