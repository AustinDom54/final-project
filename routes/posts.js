const express = require('express')
const { getPosts, showPost } = require('../controllers/posts')
const routerPosts = express.Router()

// Rutas de Index
routerPosts.get('/posts', getPosts)
routerPosts.get('/posts/:slug', showPost)

module.exports = {
	routerPosts
}