const User = require('../model/user').User;

const validateAccount = (email, password, callback) => {
  User.findOne({email: email, password: password}, (error, response) => {
    if (error) {
      callback(error);
    } else {
      if (response) {
        callback(null, { email: response.email, username: response.username });
      } else {
        callback(null, null);
      }
    }
  });
}

const getProfile = (username, callback) => {
  User.findOne({username: username}, (error, response) => {
    if (error) {
      callback(error);
    } else {
      if (response) {
        let profile = {
          email: response.email,
          username: response.username,
          bio: response.bio,
          image: response.image
        }
        callback(null, profile);
      } else {
        callback(null, null);
      }
    }
  });
}

const insertUserIfNotExist = (user, callback) => {
  User.findOne({username: user.username, email: user.email}, (error, response) => {
    if (error) {
      callback(error);
    } else {
      if (response) {
        callback(null, null);
      } else {
        let userToInsert = new User({
          email: user.email,
          username: user.username,
          password: user.password
        });

        let promise = User.create(userToInsert);
        promise.then(created_user => {
          callback(null, {username: created_user.username, email: created_user.email});
        });
      }
    }
  });
}

const getFollowingUsers = (username, callback) => {
  // TODO: return arrays of user id that this user is following
}

const getFavoriteArticles = (username, callback) => {
  // TODO: return arrays of article id that this user is following
}

module.exports = { validateAccount, getProfile, insertUserIfNotExist, getFollowingUsers, getFavoriteArticles }