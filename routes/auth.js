const express = require('express');
const router = express.Router();
const account = require('../users/controller/account');
const error = require('../shared/error');

router.post('/login', account.login, error.handleError);
router.post('/register', account.register, error.handleError);

module.exports = router;