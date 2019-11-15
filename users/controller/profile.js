const auth = require('../../shared/auth');
const userDB = require('../db/user-db');

const getProfile = (req, res) => {
  console.log(req.headers);
  if (!auth.authorize(req.headers)) {
    res.status(401);
    res.send({message: 'You dont have permission to do this'});
    return;
  }

  console.log(req.params);
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

}

module.exports = { getProfile, updateProfile }