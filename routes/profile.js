const express = require('express');
const router = express.Router();
const profile = require('../controllers/profile');
const auth = require('../controllers/auth');
const error = require('../controllers/error');

router.get('/:username', auth.authorize, profile.getProfile, error.handleError);
router.post('/edit', auth.authorize, profile.updateProfile, error.handleError);
router.get('/id/:id', auth.authorize, profile.getUsername, error.handleError);

module.exports = router;