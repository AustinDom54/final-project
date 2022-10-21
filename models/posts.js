const mongoose = require('mongoose')
const slugify = require('slugify')

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		body: {
			type: String,
			required: true
		},
		slug: {
			type: String,
			/* required: true, */
			/* unique: true */
		}
	},
	{
		versionKey: false
	}
)

// Middleware .pre()
// TODO: Llevar este middleware a un archivo separado
postSchema.pre('validate', function(next) {
	if (this.title) {
		this.slug = slugify(this.title, { lower: true, string: true })
	}
	next()
})

module.exports = mongoose.model('Post', postSchema)