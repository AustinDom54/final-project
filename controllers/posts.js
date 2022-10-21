const { response } = require('express')
const Post = require('../models/posts')

// INDEX
const getPosts = async (req, res = response) => {

	try {
		const posts = await Post.find({}).lean() // Me deja un objeto puro de JS
		// console.log(posts)
		const title = "Listado de Post"
		res.status(200).render('index',
			{
				title,
				posts
			}
		)

	} catch (error) {
		console.log('Error INDEX', error)
	}
}

// SHOW
const showPost = async (req, res = response) => {

	try {
		const post = await Post.findOne({ slug: req.params.slug }).lean()
		if (!post)
			return res.redirect('/')

		res.render('show',
		{
			title: `InfoBlog - ${post.title}`,
			post
		})
	} catch (error) {
		console.log('Error', error)
	}
}

module.exports = {
	getPosts,
	showPost
}