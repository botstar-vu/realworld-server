const mongoose = require('mongoose');

let articleSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    time: Date,
    description: String,
    content: String,
    like: Number,
    tags: [String],
    comments: [String]
  }
);

module.exports.Article = mongoose.model('Article', articleSchema);