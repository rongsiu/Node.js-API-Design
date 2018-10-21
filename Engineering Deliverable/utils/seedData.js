const db = require('../database/index.js');
const Post = require('../server/models/Post.js');
const data = require('./testData.json');

function seedDatabase() {
	Post.create(data.data);
}

seedDatabase();
