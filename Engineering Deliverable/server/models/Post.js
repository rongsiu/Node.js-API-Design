const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	id: Number,
	body: String,
	time_stamp: Date,
	relevance_score: Number,
	sentiment_score: Number,
	city: String,
	country: String,
	company: String,
	sector: String,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
