let mongoose = require("mongoose");
let Post = require('../server/models/Post.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server/app.js');
let should = chai.should();


chai.use(chaiHttp);

describe('Posts', () => {
	beforeEach((done) => {
		Post.deleteMany({}, (err) => {
			done();           
		});        
	});

	describe('GET /posts', () => {
		it('it should GET all posts', (done) => {
			chai.request(server)
				.get('/api/posts')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					done();
				});
		});
	});

	describe('GET /posts with params' , () => {
		it('it should return 404 status if param does not exist', (done) => {
			let post = new Post({
				"body": "Aenean id massa ex",
				"city": "canada",
				"company": "Apple",
				"country": "United States of America",
				"id": 1,
				"relevance_score": 0.99,
				"sector": "Technology",
				"sentiment_score": 1.05,
				"time_stamp": "7/30/2018 17:12:57"
			});

			post.save((err, post) => {
				chai.request(server)
					.get('/api/posts?cityyyy=canada')
					.end((err, res) => {
						res.should.have.status(404);
						done();
					});
			});
		});

		it('it should return posts with matching param', (done) => {
			let post = new Post({
				"body": "Aenean id massa ex",
				"city": "Montreal",
				"company": "Apple",
				"country": "United States of America",
				"id": 1,
				"relevance_score": 0.99,
				"sector": "Technology",
				"sentiment_score": 1.05,
				"time_stamp": "7/30/2018 17:12:57"
			});

			post.save((err, post) => {
				chai.request(server)
					.get('/api/posts?city=montreal')
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('array');
						res.body[0].should.have.property('city').eql(post.city);
						done();
					});
			});
		});

		it('it should not return posts without matching param', (done) => {
			let post = new Post({
				"body": "Aenean id massa ex",
				"city": "Montreal",
				"company": "Apple",
				"country": "Canada",
				"id": 1,
				"relevance_score": 0.99,
				"sector": "Technology",
				"sentiment_score": 1.05,
				"time_stamp": "7/30/2018 17:12:57"
			});

			post.save((err, post) => {
				chai.request(server)
					.get('/api/posts?city=ca')
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('array');
						res.body.length.should.eql(0);
						done();
					});
			});
		});
	});
});


describe('Aggregate', () => {
		beforeEach((done) => {
		Post.deleteMany({}, (err) => {
			done();           
		});        
	});

	describe('GET /agg', () => {
		it('it should GET aggregation', (done) => {
			chai.request(server)
				.get('/api/agg')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					done();
				});
		});
	});

	describe('GET /agg with params' , () => {
		it('it should return 404 status if param does not exist', (done) => {
			chai.request(server)
				.get('/api/agg?typeeee=mode')
				.end((err, res) => {
					res.should.have.status(404);
					done();
				});
		});
	});
});