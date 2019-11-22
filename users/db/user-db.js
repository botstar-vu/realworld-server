const User = require('../model/user').User;

const validateAccount = (email, password, callback) => {
  User.findOne({email: email, password: password}, (error, response) => {
    if (error) {
      callback(error);
    } else {
      console.log('found', response);
      if (response) {
        callback(null, response);
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
          _id: response._id,
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

const findOne = (query, callback) => {
  User.findOne(query, (error, response) => {
    if (error) {
      callback(error);
    } else {
      callback(null, response);
    }
  });
}

const insert = (user, callback) => {
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
          console.log('registed user: ', created_user);
          callback(null, created_user);
        });
      }
    }
  });
}

const update = (user, callback) => {
  let query = { _id: user._id }
  let options = { upsert: true, new: true, setDefaultOnInsert: true, useFindAndModify: false }
  let update = {
    email: user.email,
    username: user.username,
    bio: user.bio,
    image: user.image
  }

  if (user.password && user.password.length > 0) {
    update.password = user.password;
  }

  User.findOneAndUpdate(query, update, options, (error, response) => {
    if (error) {
      callback(error);
    } else {
      callback(null, response);
    }
  });
}

const getFollowingUsers = (username, callback) => {
  // TODO: return arrays of user id that this user is following
}

const getFavoriteArticles = (username, callback) => {
  // TODO: return arrays of article id that this user is following
}

module.exports = { validateAccount, getProfile, insert, update, getFollowingUsers, getFavoriteArticles, findOne }