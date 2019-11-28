const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
require('mongoose-uuid2')(mongoose);
const UUID = mongoose.Types.UUID;

let userSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    email: { type: String, index: true },
    username: { type: String, index: true },
    password: String,
    bio: { type: String, default: ''},
    image: { type: String, default: ''},
    articles: [{type: String, ref: 'article'}],
    favorites: [{type: String, ref: 'article'}],
    followings: [{type: String, ref: 'user'}]
  }
);

module.exports = mongoose.model('User', userSchema);