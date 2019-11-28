const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
require('mongoose-uuid2')(mongoose);
const UUID = mongoose.Types.UUID;

const articleSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4, required: true },
    title: { type: String, index: true },
    author: { type: String, ref: 'User', index : true},
    time: { type: Date, index: true },
    description: String,
    content: String,
    like: Number,
    tags: { type: [String], index: true },
    comments: [String]
  }
);

module.exports = mongoose.model('Article', articleSchema);