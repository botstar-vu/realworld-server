const express = require('express');
const router = express.Router();
const feed = require('../controllers/feed');
const auth = require('../controllers/auth');

router.get('/home', feed.getHomepage);
router.get('/:userid/posts', feed.getPersonalPosts);
router.get('/:userid/favorite', auth.authorize, feed.getFavoritePosts);
router.get('/:userid', auth.authorize, feed.getPersonalFeed);

module.exports = router;