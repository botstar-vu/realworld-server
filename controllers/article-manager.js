const articleDB = require('../db/article-db');
const auth = require('./auth');

const create = (req, res, next) => {
  const {title, author, time, description, content, tags } = req.body;
  articleDB.create({title, author, time, description, content, tags}, (response) => {
    if (!response) {
      req.error = { code: 502 }
      next();
    } else {
      res.status(201).json(response);
    }
  });
}

const update = (req, res, next) => {
  const {_id, title, author, time, description, content, tags } = req.body;
  articleDB.update(_id, {title, time, description, content, tags}, (error, response) => {
    if (error) {
      req.error = { code: 502}
      next();
    } else if (response) {
      res.status(200).json(response);
    } else {
      req.error = { code: 404}
      next();
    }
  });
}

const remove = (req, res, next) => {
  const id = req.params.id;
  articleDB.remove(id, (error, response) => {
    if (error) {
      req.error = { code: 502}
      next();
    } else if (response) {
      res.status(200).send({message: 'success'});
    } else {
      req.error = { code: 404}
      next();
    }
  });
}

const getOne = (req, res, next) => {
  const id = req.params.id;
  console.log('trying to get ', id);
  articleDB.findOne({_id: id}, (error, response) => {
    if (error) {
      req.error = { code: 502}
      next();
    } else if (response) {
      res.status(200).send(response);
    } else {
      req.error = { code: 404}
      next();
    }
  });
}

const getByAuthor = (req, res, next) => {
  const userID = req.params.userid;
  articleDB.findMany({author: userID}, {start: 0, number: 10}, (error, response) => {
    if (error) {
      req.error.code = 502;
      next();
    } else if (response) {
      res.status(200).send(response);
    } else {
      req.error.code = 404;
      next();
    }
  });
}

const getByTag = (req, res) => {
  // TODO: get a list of articles contain a specified tag
}

const getHomepage = (req, res) => {
  const { page } = req.body;
  const frame = 10;
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