const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
require('mongoose-uuid2')(mongoose);
const UUID = mongoose.Types.UUID;

const articleSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4, required: true },
    title: String,
    author: String,
    time: Date,
    description: String,
    content: String,
    like: Number,
    tags: { type: [String], index: true },
    comments: [String]
  }
);

module.exports.Article = mongoose.model('Article', articleSchema);