const express = require('express')
const routerPosts = express.Router()

const { getPosts, newPost, createPost, showPost, deletePost, showPostFormEdit, traerPostCards, updatePost } = require('../controllers/posts')
const isAuthenticated = require('../middlewares/isauthenticated')

// Rutas de Index

routerPosts.get('/', traerPostCards)

routerPosts.get('/posts', isAuthenticated, getPosts)
routerPosts.get('/posts/new', isAuthenticated, newPost)
routerPosts.get('/posts/edit/:id', isAuthenticated, showPostFormEdit)
routerPosts.get('/posts/:slug', isAuthenticated, showPost)

routerPosts.post('/posts', isAuthenticated, createPost)

// TODO: Acomodar las rutas, no es update. Debería ser /posts/edit/:id+[método] . . .
routerPosts.post('/posts/update/:id', isAuthenticated, updatePost)

routerPosts.delete('/posts/:id', isAuthenticated, deletePost)


module.exports = {
	routerPosts
}