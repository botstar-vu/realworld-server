const Article = require('../models/article-model');

const create = async (req, res, next) => {
  console.log('start creating');
  const {title, author, time, description, content, tags } = req.body;
  try {
    const createdArtcle = await Article.create({title, author, time, description, content, tags});
    res.status(200).json(createdArtcle);
  } catch (error) {
    console.log('create article error', error);
    req.error = { code: 501, message: 'Cannot create article'};
    next();
  }
}

const update = async (req, res, next) => {
  console.log('start updating');
  const { _id, title, author, time, description, content, tags } = req.body;
  try {
    const update = { _title, time, description, content, tags };
    const options = { upsert: true, new: true, setDefaultOnInsert: true, useFindAndModify: false };
    const updatedArticle = await Article.findByIdAndUpdate(_id, update, options);
    res.status(200).json(updatedArticle);
  } catch (error) {
    console.log('update article error', error);
    req.error = { code: 501, message: 'Cannot update article'};
    next();
  }
}

const get = async (req, res, next) => {
  const id = req.params.id;
  console.log('trying to get ', id);
  
  try {
    const article = await Article.findById(id).populate('comments');
    res.status(200).json(article);
  } catch (error) {
    console.log('get article error', error);
    req.error = { code: 501, message: 'Cannot get article'};
    next();
  }
}

const remove = async (req, res, next) => {
  const id = req.params.id;
  try {
    const deletedArticle = await Article.findByIdAndDelete(id);
    res.status(200).json(deletedArticle);
  } catch (error) {
    console.log('delete article error', error);
    req.error = { code: 501, message: 'Cannot delete article'};
    next();
  }
}

module.exports = { create, update, get, remove }