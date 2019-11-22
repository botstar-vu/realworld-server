const express = require('express');
const router = express.Router();
const profile = require('../users/controller/profile');
const auth = require('../shared/auth');
const error = require('../shared/error');

router.get('/:username', auth.authorize, profile.getProfile, error.handleError);
router.post('/edit', auth.authorize, profile.updateProfile, error.handleError);
router.get('/id/:id', auth.authorize, profile.getUsername, error.handleError);

module.exports = router;