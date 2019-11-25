const express = require('express');
const router = express.Router();
const account = require('../controllers/account');
const error = require('../controllers/error');

router.post('/login', account.login, error.handleError);
router.post('/register', account.register, error.handleError);

module.exports = router;