const Article = require('../shared/article').Article;


const create = (document, callback) => {
  let promise = Article.create(document);
  promise.then(doc => {
    callback(doc);
    return doc;
  });
}

const update = (id, update, callback) => {
  let query = id? { _id: id} : {};
  let options = { upsert: true, new: true, setDefaultOnInsert: true, useFindAndModify: false }

  Article.findOneAndUpdate(query, update, options, (error, response) => {
    if (error) {
      callback(error);
    } else {
      callback(null, response);
    }
  });
}

const find = (query, range, callback) => {
  let { start, number } = range;
  Article.find(query, (error, response) => {
    if (error) {
      callback(error);
    } else {
      callback(null, response);
    }
  }).skip(start).limit(number);
}

const remove = (id, callback) => {
  let options = { useFindAndModify: false }
  let que = Article.findByIdAndDelete(id, options, (error, response) => {
    if (error) {
      callback(error);
    } else {
      callback(null, response);
    }
  });
  console.log('que', que);
}

module.exports = { create, update, remove, find }