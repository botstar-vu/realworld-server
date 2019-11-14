const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', () => {console.error.bind(console, 'connection error')});
mongoose.connection.once('open', () => {console.log('database connected')});


app.listen(8000);