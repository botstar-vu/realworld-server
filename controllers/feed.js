const Article = require('../models/article-model');
const User = require('../models/user-model');

const getHomepage = async (req, res, next) => {
  try {
    const feed = await Article.find();
    res.status(200).json(feed);
  } catch (error) {
    console.log('homepage error', error);
    req.error = { code: 500, message: 'Cannot load homepage'};
    next();
  }
}

const getPersonalPosts = async (req, res, next) => {
  const userID = req.params.userid;
  console.log('trying to get posts of', userID);
  try {
    const feed = await Article.find({author: userID});
    console.log(feed);
    res.status(200).json(feed);
  } catch (error) {
    console.log('personal posts', error);
    req.error = { code: 500, message: 'Cannot load personal posts'};
    next();
  }
}

const getFavoritePosts = async (req, res, next) => {
  const userID = req.params.userid;
  console.log('trying to get favorite posts of', userID);
  try {
    const user = await User.findById(userID).populate('favorites');
    const posts = user.favorites;
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    console.log('favorite posts', error);
    req.error = { code: 500, message: 'Cannot load favorite posts'};
    next();    
  }
}

const getPersonalFeed = async (req, res, next) => {
  
}

module.exports = { getHomepage, getPersonalPosts, getFavoritePosts, getPersonalFeed }