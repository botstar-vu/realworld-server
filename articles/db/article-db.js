const Article = require('../model/article').Article;

const create = (document, callback) => {
  const promise = Article.create(document);
  promise.then(doc => {
    callback(doc);
    return doc;
  });
}

const update = (id, update, callback) => {
  const query = id? { _id: id} : {};
  const options = { upsert: true, new: true, setDefaultOnInsert: true, useFindAndModify: false }

  Article.findOneAndUpdate(query, update, options, (error, response) => {
    if (error) {
      callback(error);
    } else {
      callback(null, response);
    }
  });
}

const findOne = (query, callback) => {
  Article.findOne(query, (error, response) => {
    if (error) {
      callback(error);
    } else {
      callback(null, response);
    }
  });
}

const findMany = (query, range, callback) => {
  const { start, number } = range;
  Article.find(query, (error, response) => {
    if (error) {
      callback(error);
    } else {
      callback(null, response);
    }
  }).skip(start).limit(number);
}

const remove = (id, callback) => {
  const options = { useFindAndModify: false }
  Article.findByIdAndDelete(id, options, (error, response) => {
    if (error) {
      callback(error);
    } else {
      callback(null, response);
    }
  });
}

module.exports = { create, update, remove, findOne, findMany }