const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/posts';

const db = mongoose.connect(mongoUri, { useNewUrlParser: true });

module.exports = db;
