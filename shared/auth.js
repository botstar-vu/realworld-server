const jwt = require('jsonwebtoken');
require('dotenv').config();

const getToken = (payload) => {
  const signOptions = {
    issuer: 'ang-server',
    subject: 'abc@angular',
    audience: 'localhost',
    expiresIn: '6h',
    algorithm: 'RS256'
  }
  return jwt.sign(payload, process.env.PRIVATE_KEY, signOptions);
}

const verifyToken = (token) => {
  const verifyOptions = {
    issuer: 'ang-server',
    subject: 'abc@angular',
    audience: 'localhost',
    expiresIn: '6h',
    algorithm: ['RS256']
  }

  try {
    return jwt.verify(token, process.env.PUBLIC_KEY, verifyOptions);
  } catch (err) {
    console.log('verify token error: ', err);
    return null;
  }
}

const authorize = (req, res, next) => {
  console.log('checking authorization');
  const token = req.headers.authorization;
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7);
    let verified = verifyToken(token)
    if (verified) {
      next();
      return;
    }
  }
  res.status(401).json({message: 'Unauthorized'});
}

module.exports = {
  getToken,
  verifyToken,
  authorize
}