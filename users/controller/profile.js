const auth = require('../../shared/auth');
const userDB = require('../db/user-db');

const getProfile = (req, res, next) => {
  let username = req.params.username;
  userDB.getProfile(username, (error, response) => {
    if (error) {
      req.error = { code: 502 };
      next();
    } else if (response) {
      res.status(200).send(response);
    } else {
      req.error = { code: 404 };
      next();
    }
  });
}

const updateProfile = (req, res, next) => {
  let profile = req.body.profile;
  userDB.update(profile, (error, response) => {
    if (error) {
      req.error = { code: 502 };
      next();
    } else if (response) {
      response.password = '';
      res.status(200).send({token: auth.getToken({email: response.email, username: response.username}), user: response});
    } else {
      req.error = { code: 404 };
      next();
    }
  })
}

const getUsername = (req, res, next) => {
  let id = req.params.id;
  userDB.findOne({_id: id}, (error, response) => {
    if (error) {
      req.error = { code: 502 };
      next();
    } else if (response) {
      res.status(200).send({username: response.username});
    } else {
      req.error = { code: 404 };
      next();
    }
  });
}

module.exports = { getProfile, updateProfile, getUsername }