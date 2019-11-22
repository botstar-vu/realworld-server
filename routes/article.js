const express = require('express');
const router = express.Router();
const articles = require('../articles/controller/article-manager');
const auth = require('../shared/auth');
const error = require('../shared/error');

router.post('/add', auth.authorize, articles.create, error.handleError);
router.post('/edit', auth.authorize, articles.update, error.handleError);
router.get('/load/:id', articles.getOne, error.handleError);
router.delete('/delete/:id', auth.authorize, articles.remove, error.handleError);

module.exports = router;