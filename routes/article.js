const express = require('express');
const router = express.Router();
const articles = require('../controllers/article-manager');
const comments = require('../controllers/comment');
const auth = require('../controllers/auth');
const error = require('../controllers/error');

router.post('/:article/comment', auth.authorize, comments.create, error.handleError);
router.put('/:article/comment', auth.authorize, comments.update, error.handleError);
router.get('/:article/comment', auth.authorize, comments.get, error.handleError);
router.delete('/:article/comment', auth.authorize, comments.remove, error.handleError);

router.post('/', auth.authorize, articles.create, error.handleError);
router.put('/', auth.authorize, articles.update, error.handleError);
router.get('/:id', articles.get, error.handleError);
router.delete('/:id', auth.authorize, articles.remove, error.handleError);

module.exports = router;