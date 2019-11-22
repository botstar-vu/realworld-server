const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
require('mongoose-uuid2')(mongoose);
const UUID = mongoose.Types.UUID;

let userSchema = new mongoose.Schema(
  {
    _id: { type: UUID, default: uuidv4 },
    email: { type: String, index: true },
    username: { type: String, index: true },
    password: String,
    bio: { type: String, default: ''},
    image: { type: String, default: ''},
    article: [String],
    favortie: [String],
    following: [String]
  }
);

module.exports.User = mongoose.model('User', userSchema);