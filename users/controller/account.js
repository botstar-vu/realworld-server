const auth = require('../../shared/auth');
const userDB = require('../db/user-db');

const login = (req, res) => {
  let data = req.body;
  userDB.validateAccount(data.email, data.password, (error, response) => {
    if (error) {
      res.status(500);
      res.send({message: 'Something went wrong'});
    } else if (response) {
      let token = auth.getToken({email: response.email, username: response.username});
      res.status(200);
      console.log(response);
      res.send({token: token, user: response});
    } else {
      res.status(401);
      res.send({message: 'Email or username is not valid'});
    }
  });
};

const register = (req, res) => {
  let data = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  }
  console.log(data);
  userDB.insert(data, (error, response) => {
    if (error) {
      res.status(500);
      res.send({message: 'Something went wrong'});
    } else if (response) {
      let token = auth.getToken({email: response.email, username: response.username});
      res.status(200);
      res.send({token: token, user: response});
    } else {
      res.send(401);
      res.send({message: 'username or email is already taken'});
    }
  });
}

module.exports = { login, register }