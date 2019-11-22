const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const articleRouter = require('./routes/article');
const feedRouter = require('./routes/feed');
const profileRouter = require('./routes/profile');
const authRouter = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', () => {console.error.bind(console, 'connection error')});
mongoose.connection.once('open', () => {console.log('database connected')});

app.use('/api/article', articleRouter);
app.use('/api/feed', feedRouter);
app.use('/api/profile', profileRouter);
app.use('/api/auth', authRouter);

app.listen(8000);