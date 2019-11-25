const express = require('express');
const router = express.Router();
const articles = require('../controllers/article-manager');
const auth = require('../controllers/auth');
const error = require('../controllers/error');

router.post('/add', auth.authorize, articles.create, error.handleError);
router.post('/edit', auth.authorize, articles.update, error.handleError);
router.get('/load/:id', articles.getOne, error.handleError);
router.delete('/delete/:id', auth.authorize, articles.remove, error.handleError);

module.exports = router;