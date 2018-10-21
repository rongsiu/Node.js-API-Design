const express = require('express');
const router = express.Router();
const aggController = require('../controllers/agg.js');

router.route('/')
	.get(aggController.getAgg);

module.exports = router;
