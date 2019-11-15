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
  if (!auth.authorize(req.headers)) {
    res.status(401);
    res.send({message: "You don't have permission to do this"});
    return;
  }

  let {_id, title, author, time, description, content, tags } = req.body;
  articleDB.update(
    _id,
    {
      title: title,
      time: time,
      description: description,
      content: content,
      tags, tags
    },
    (error, response) => {
      if (error) {
        res.status(500);
        res.send({message: 'Server is broken'});
      } else if (response) {
        res.status(200);
        res.send(response);
      } else {
        res.status(404);
        res.send({message: 'Cannot find article'});
      }
    }
  )
}

const remove = (req, res) => {
  if (!auth.authorize(req.headers)) {
    res.status(401);
    res.send({message: "You don't have permission to do this"});
    return;
  }

  let id = req.params.id;
  articleDB.remove(id, (error, response) => {
    if (error) {
      res.status(500);
      res.send({message: 'error on server'});
    } else if (response) {
      res.status(200);
      res.send({message: 'success'});
    } else {
      res.status(404);
      res.send({message: 'cant find article'});
    }
  });
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
  let userID = req.params['userid'];
  articleDB.findMany({author: userID}, {start: 0, number: 10}, (error, response) => {
    if (error) {
      res.status(500);
      res.send({message: 'Server error'});
    } else if (response) {
      res.status(200);
      res.send(response);
    } else {
      res.status(400);
      res.send({message: 'Cant find this user'});
    }
  });
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