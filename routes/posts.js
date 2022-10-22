const express = require('express')
const { getPosts, newPost, createPost, showPost, showPostFormEdit, deletePost } = require('../controllers/posts')
const routerPosts = express.Router()

// Rutas de Index
routerPosts.get('/posts', getPosts)
routerPosts.get('/posts/new', newPost)
routerPosts.get('/posts/edit/:id', showPostFormEdit)	// TODO: cambiar a show el resto
routerPosts.get('/posts/:slug', showPost)

routerPosts.post('/posts', createPost)

routerPosts.delete('/posts/:id', deletePost)


module.exports = {
	routerPosts
}