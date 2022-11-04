const { response } = require("express");
const Post = require("../models/posts");

// Mostrar los post en cards

const traerPostCards = async (req, res = response) => {
	try {
		const posts = await Post.find({}).lean(); // Me deja un obj puro de JS
		//console.log(posts)
		const title = "InfoBlog - Inicio";
		res.status(200).render("home", {
			title,
			posts,
		});
	} catch (error) {
		console.log('Error INDEX', error)
	}
}

// INDEX
const getPosts = async (req, res = response) => {
	// const framework = req.locals.metro_framework
	try {
		const posts = await Post.find({user: req.user.id}).lean(); // Me deja un obj puro de JS
		//console.log(posts)
		const title = "InfoBlog - Listado de Post";
		res.status(200).render("index", {
			title,
			posts,
			// framework
		});
	} catch (error) {
		console.log('Error INDEX', error)
	}
};

// SHOW
const showPost = async (req, res = response) => {
	try {
		const post = await Post.findOne({ slug: req.params.slug }).lean();
		if (post === null) {
			res.redirect("/");
			return
		}

		res.render("posts/show", {
			title: `InfoBlog - ${post.title}`,
			post,
		})

	} catch (error) {
		console.log('Error SHOW' , error)
	}
};

// DELETE
const deletePost = async (req, res = response) => {
	try {
		await Post.findByIdAndDelete(req.params.id)
		res.redirect('/posts')

	} catch (error) {
		console.log('Error DELETE', error)
	}
}

// NEW
const newPost = (req, res = response) => {
	res.status(200).render('posts/new')
}

// CREATE
const createPost = async (req, res = response) => {

	try {
		// console.log(req.body)
		let post = new Post()

		post.title = req.body.title
		post.body = req.body.body
		post.user = req.user.id
		post.date = new Date(Date.now())

		post = await post.save()
		res.redirect(`/posts/${post.slug}`)

	} catch (error) {
		console.log('Error CREATE', error)
	}
}

// Show Post Form Edit
const showPostFormEdit = async (req, res = response) => {

	try {
		const post = await Post.findById(req.params.id).lean()

		res.render('posts/edit', {
			title: 'Editando Post',
			post
		})
		
	} catch (error) {
		console.log('Show Edit Post', error)
	}
}

// Editar post
const updatePost = async (req, res = response) => {
	try {
		let post = await Post.findOne({ _id: req.params.id }).lean();
		if (post === null) {
			res.redirect("/")
			return
		}

		await Post.updateOne({ _id: req.params.id }, { $set: { title: req.body.title, body: req.body.body }})
		req.flash("todo_ok", "¡Post editado!")
		res.redirect(`/posts/${post.slug}`)
	
	} catch (error) {
		console.log("Error al editar post", error)
	}
}

module.exports = {
	getPosts,
	showPost,
	deletePost,
	createPost,
	newPost,
	showPostFormEdit,
	traerPostCards,
	updatePost
};
