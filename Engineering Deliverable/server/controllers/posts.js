const Post = require('../models/Post.js');

	const getPosts = (req, res) => {
		const query = {};
		let limit = 0;
		let sort = { id: 1 };

		for (let key in req.query) {
	//Filter posts whose body contains a specific word or list of words
			if (key === 'body') {
				query.body = { $regex: req.query.body, $options: 'i' };
			}

	//Filter posts by city
			else if (key === 'city') {
				query.city = { $regex: new RegExp('^' + req.query.city + '$'), $options: 'i' };
			}

	//Filter posts by country
			else if (key === 'country') {
				query.country = { $regex: new RegExp('^' + req.query.country + '$'), $options: 'i' };
			}

	//Limit the number of results returned
			else if (key === 'limit') {
				limit = parseInt(req.query.limit);
			}

	//Order results by timestamp (both ascending and descending) 
			else if (key === 'sort') {
				const index = req.query.sort.lastIndexOf('_');
				const sort_by = req.query.sort.substring(0, index);
				const order = req.query.sort.substring(index + 1);

				sort = { [sort_by]: order === 'asc' ? 1 : -1 };
			} else {
				res.status(404).send(`${key} is not a valid query parameter`);
				return;
			}
		}

		Post.find(query)
			.sort(sort)
			.limit(limit)
			.then(posts => {
				res.json(posts);
			})
			.catch(err => {
				res.status(404).send(err);
			});
	}

module.exports = { getPosts };
