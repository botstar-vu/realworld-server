const auth = require('../../shared/auth');
const userDB = require('../db/user-db');

const getProfile = (req, res) => {
  if (!auth.authorize(req.headers)) {
    res.status(401);
    res.send({message: 'You dont have permission to do this'});
    return;
  }

  let username = req.params['username'];
  userDB.getProfile(username, (error, response) => {
    if (error) {
      res.status(500);
      res.send({message: 'Server is broken'});
    } else if (response) {
      res.status(200);
      res.send(response);
    } else {
      res.status(404);
      res.send({message: 'User is not valid'});
    }
  });
}

const updateProfile = (req, res) => {
  if (!auth.authorize(req.headers)) {
    res.status(401);
    res.send({message: 'You dont have permission to do this'});
    return;
  }
  let profile = req.body.profile;
  userDB.update(profile, (error, response) => {
    if (error) {
      res.status(500);
      res.send({message: 'Something went wrong with server'});
    } else if (response) {
      res.status(200);
      response.password = '';
      res.send({token: auth.getToken({email: response.email, username: response.username}), user: response});
    } else {
      res.status(404);
      res.send({message: 'User is invalid'});
    }
  })
}

const getUsername = (req, res) => {
  let id = req.params['id'];
  console.log('id', id);
  userDB.findOne({_id: id}, (error, response) => {
    if (error) {
      res.status(500);
      res.send({message: 'Server error'});
    } else if (response) {
      res.status(200);
      res.send({username: response.username});
    } else {
      res.status(404);
      res.send({message: 'Cannot find user'});
    }
  });
}

module.exports = { getProfile, updateProfile, getUsername }