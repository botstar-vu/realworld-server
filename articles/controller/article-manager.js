const articleDB = require('../db/article-db');
const auth = require('../../shared/auth');

const create = (req, res) => {

  if (!auth.authorize(req.headers)) {
    res.status(401);
    res.send({message: "You don't have permission to do this"});
    return;
  }

  let {title, author, time, description, content, tags } = req.body;
  articleDB.create(
    {
      title: title,
      author: author,
      time: time,
      description: description,
      content: content,
      tags: tags
    },
    (response) => {
      if (!response) {
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
  let id = req.params['id'];
  articleDB.findOne({_id: id}, (error, response) => {
    if (error) {
      res.status(500);
      res.send({message: 'Something wrong with the server'});
    } else if (response) {
      res.status(200);
      res.send(response);
    } else {
      res.status(404);
      res.send({message: 'Cannot find this article'});
    }
  });
}

const getByAuthor = (req, res) => {
  
}

const getByTag = (req, res) => {
  
}

const getHomepage = (req, res) => {
  let { page } = req.body;
  let frame = 10;
  articleDB.findMany({}, {start: page, number: frame}, (error, response) => {
    if (error || !response) {
      res.status(500);
      res.send({message: 'Something went wrong with server'});
    } else {
      res.status(200);
      res.send(response);
    }
  });
}

module.exports = { create, update, remove, getOne, getByAuthor, getByTag, getHomepage }