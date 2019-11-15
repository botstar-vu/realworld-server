const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const account = require('./users/controller/account');
const articles = require('./articles/controller/article-manager');
const profile = require('./users/controller/profile');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', () => {console.error.bind(console, 'connection error')});
mongoose.connection.once('open', () => {console.log('database connected')});

app.post('/api/login', account.login);
app.post('/api/register', account.register);

app.get('/api/profile/:username', profile.getProfile);
app.post('/api/profile/edit', profile.updateProfile);

app.post('/api/article/add', articles.create);
app.get('/api/article/load/:id', articles.getOne);

app.get('/api/feed/home', articles.getHomepage);
app.get('/api/feed/:username', articles.getByAuthor);

app.listen(8000);