const Post = require('../models/Post.js');

	const getAgg = (req, res) => {
		let start_date = new Date(-8640000000000000);
		let end_date = new Date(8640000000000000);
		let group_by = null;
		const group = {
			_id: group_by,
			'avg relevance score': { $avg: '$relevance_score' },
			'avg sentiment score': { $avg: '$sentiment_score' },
		};

	for (let key in req.query) {
		console.log(key)
		if(key === 'start') {
			console.log(req.query.start)
			start_date = new Date(req.query.start);
		}

		else if(key === 'end') {
			end_date = new Date(req.query.end);
		}

// Aggregation based on metric (median, mode, range)
		else if (key === 'type') {
			const arr = req.query.type.split(',');

			for (let val of arr) {
				if (val === 'median') {
					group[`${val} relevance score`] = { $avg: '$relevance_score' };
					group[`${val} sentiment score`] = { $avg: '$sentiment_score' };
				} else if (val === 'mode') {
					group[`${val} relevance score`] = { $max: '$relevance_score' };
					group[`${val} sentiment score`] = { $max: '$sentiment_score' };
				} else if (val === 'range') {
					group['max relevance score'] = { $max: '$relevance_score' };
					group['min relevance score'] = { $min: '$relevance_score' };
					group['max sentiment score'] = { $max: '$sentiment_score' };
					group['min sentiment score'] = { $min: '$sentiment_score' };
				}
			}
		}

//Aggregation based on date (hour, week, day)
		else if (key === 'group_by') {
			if (req.query.group_by === 'hour') {
				group['_id'] = {
					year: { $year: '$time_stamp' },
					month: { $month: '$time_stamp' },
					day: { $dayOfMonth: '$time_stamp' },
					hour: { $hour: '$time_stamp' },
				};
			} else if (req.query.group_by === 'day') {
				group['_id'] = {
					year: { $year: '$time_stamp' },
					month: { $month: '$time_stamp' },
					day: { $dayOfMonth: '$time_stamp' },
				};
			} else if (req.query.group_by === 'week') {
				group['_id'] = {
					year: { $year: '$time_stamp' },
					week: { $week: '$time_stamp' },
				};
			}
		} else {
				res.status(404).send(`${key} is not a valid query parameter`);
				return;
			}
	}


		Post.aggregate([
			{
				$match: {
					time_stamp: {
						$gte: start_date,
						$lte: end_date,
					},
				},
			},
			{
				$group: group,
			},
		]).then(posts => {
				res.json(posts);
			})
			.catch(err => {
				res.status(404).send(err);
			});
	}


module.exports = { getAgg };
