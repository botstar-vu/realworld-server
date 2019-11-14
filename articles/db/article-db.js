const Article = require('../shared/article').Article;

const updateOrCreate = (id, update, callback) => {
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

const find = (query, callback) => {
  Article.find(query, (error, response) => {
    if (error) {
      callback(error);
    } else {
      callback(null, response);
    }
  });
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

module.exports = { updateOrCreate, remove, find }