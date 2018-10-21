const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts.js');

router.route('/')
	.get(postsController.getPosts);

module.exports = router;
