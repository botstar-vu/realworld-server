const articleDB = require('../db/article-db');
const auth = require('../../shared/auth');

const create = (req, res) => {
  let {title, author, time, description, content, tags } = req.body;
  articleDB.updateOrCreate(
    null,
    {
      title: title,
      author: author,
      time: time,
      description: description,
      content: content,
      tags: tags
    },
    (error, response) => {
      console.log('err', error);
      console.log('res', response);
      if (error || !response) {
        res.status(500);
        res.send({message: 'Something went wrong'});
      } else {
        res.status(200);
        res.send(response);
      }
    }
    );
}

const update = (req, res) => {

}

const remove = (req, res) => {
  
}

const getOne = (req, res) => {
  
}

const getByAuthor = (req, res) => {
  
}

const getByTag = (req, res) => {
  
}

const getPage = (req, res) => {
  
}

module.exports = { create, update, remove, getOne, getByAuthor, getByTag, getPage }