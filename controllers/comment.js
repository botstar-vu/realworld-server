const Comment = require('../models/comment-model');
const User = require('../models/user-model');
const Article = require('../models/article-model');

const create = async (req, res, next) => {
  const { author, content, time } = req.body;
  const comment = await Comment.create({author, content, time});

  const articleID = req.params.article;
  const article = await Article.findByIdAndUpdate(
    { _id: articleID },
    { $push: {comments: comment._id }},
    { new: true }
  )

  res.status(200).json(article);
}

const get = async (req, res, next) => {

}

const update = async (req, res, next) => {

}

const remove = async (req, res, next) => {

}

module.exports = { create, get, update, remove}