const express = require('express')
const Post = require('../models/posts')
const routerPosts = express.Router()

// Ritas de POSTS
routerPosts.get('/posts', async (req, res) => {


	try {
		const post = await Post.find({})

		res.render('get',
			{
				title,
				posts
			}
		)

	} catch (error) {
		console.log(error)
	}
})

module.exports = {
	routerPosts
}