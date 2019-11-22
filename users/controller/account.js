const auth = require('../../shared/auth');
const userDB = require('../db/user-db');

const login = (req, res, next) => {
  let data = req.body;
  userDB.validateAccount(data.email, data.password, (error, response) => {
    if (error) {
      req.error = { code: 502 };
      next();
    } else if (response) {
      let token = auth.getToken({email: response.email, username: response.username});
      res.status(200).send({token: token, user: response});
    } else {
      req.error = { code: 404 };
      next();
    }
  });
};

const register = (req, res, next) => {
  let data = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  }
  userDB.insert(data, (error, response) => {
    if (error) {
      req.error = { code: 502 };
      next();
    } else if (response) {
      let token = auth.getToken({email: response.email, username: response.username});
      res.status(200);
      res.send({token: token, user: response});
    } else {
      req.error = { code: 406 };
      next();
    }
  });
}

module.exports = { login, register }