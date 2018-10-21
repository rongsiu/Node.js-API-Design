
const express = require('express');
let app = express();
const db = require('../database/index.js');
const postsRouter = require('./routes/posts.js');
const aggRouter = require('./routes/agg.js');

app.use('/api/posts', postsRouter);
app.use('/api/agg', aggRouter);


module.exports = app;
