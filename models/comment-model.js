const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
require('mongoose-uuid2')(mongoose);

let commentSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    time: { type: Date, index: true },
    author: { type: String, index: true },
    content: { type: String }
  }
);

module.exports = mongoose.model('User', commentSchema);