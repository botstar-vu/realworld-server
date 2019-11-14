const mongoose = require('mongoose');

let userSchema = new mongoose.Schema(
  {
    _id: String,
    email: String,
    username: String,
    password: String,
    bio: { type: String, default: ''},
    image: { type: String, default: ''},
    article: [String],
    favortie: [String],
    following: [String]
  }
);

module.exports.User = mongoose.model('User', userSchema);