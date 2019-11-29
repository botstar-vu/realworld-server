const express = require('express');
const router = express.Router();
const feed = require('../controllers/feed');
const auth = require('../controllers/auth');
const error = require('../controllers/error');

router.get('/home', feed.getHomepage, error.handleError);
router.get('/:userid/posts', feed.getPersonalPosts, error.handleError);
router.get('/:userid/favorite', auth.authorize, feed.getFavoritePosts, error.handleError);
router.get('/:userid', auth.authorize, feed.getPersonalFeed, error.handleError);

module.exports = router;