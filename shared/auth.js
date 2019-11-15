const jwt = require('jsonwebtoken');
require('dotenv').config();

const getToken = (payload) => {
  let signOptions = {
    issuer: 'ang-server',
    subject: 'abc@angular',
    audience: 'localhost',
    expiresIn: '30m',
    algorithm: 'RS256'
  }
  return jwt.sign(payload, process.env.PRIVATE_KEY, signOptions);
}

const verifyToken = (token) => {
  let verifyOptions = {
    issuer: 'ang-server',
    subject: 'abc@angular',
    audience: 'localhost',
    expiresIn: '30m',
    algorithm: ['RS256']
  }

  try {
    return jwt.verify(token, process.env.PUBLIC_KEY, verifyOptions);
  } catch (err) {
    console.log('verify token error: ', err);
    return null;
  }
}

const authorize = (headers) => {
  let token = headers['authorization'];
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7);
  }
  return verifyToken(token);
}

module.exports = {
  getToken,
  verifyToken,
  authorize
}