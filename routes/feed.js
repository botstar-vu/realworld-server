const express = require('express');
const router = express.Router();
const articles = require('../articles/controller/article-manager');

router.get('/home', articles.getHomepage);
router.get('/:userid', articles.getByAuthor);

module.exports = router;