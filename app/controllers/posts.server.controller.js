'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Post = mongoose.model('Post'),
    _ = require('lodash');

var getErrorMessage =  function(err) {

  var message = '';

  if (err) {
    switch(err.code){
      case 11000:
      case 11001:
        message = 'Post already exist';
        break;
      default: 
        message = 'Something went wrong';  
    }
  } else{
      for (var errName in err.errors) {
        if (err.errors[errName].message) message = err.errors[errName].message;
      }
  }
};

exports.listPost = function(req, res) {
  var query = User.find().exec(function(err, shows) {
        if (err) return res.send(400, {
          message: getErrorMessage(err)
        });
          res.send(shows);
  });
    console.log('passion:', req.query);
    User.find({passion: req.query.passion}, {_id: 1}, function(err, users){
      console.log('Docs:', users);
      if (err) {
        return res.send(400, {
          message: getErrorMessage(err)
        });
      } else{
            var ids = users.map(function(doc){
                return doc._id;
            });
            Post.find({user: {$in: ids}}).sort('-created').populate('user', 'displayName').exec(function(err, posts) {
              if (err) {
                return res.send(400, {
                  message: getErrorMessage(err)
                });
              } else{
                res.jsonp(posts);
              }
            });
      }
    });
}; 

exports.list = function(req, res) {
  console.log('I got called');
  Post.find().sort('-created').populate('user', 'displayName').exec(function(err, posts){
    if (err) {
      return res.send(400, {
        message: 'Post were not saved'
      });
    } else{
      console.log('I even got here');
      res.jsonp(posts);
    }
  });
};

exports.hasAuthourization = function(req, res, next) {
  if (req.post.user.id !== req.user.id) {
    return res.send(403, 'User is not Authourized');
  }
  next();
};

exports.postById = function(req, res, next, id) {
  Post.findById(id).populate('user', 'displayName').populate('comments.commentBy', 'displayName').exec(function(err, post){
    if (err) return next(err);
    if (!post) return next(new Error('Failed to load Idea' + id));
    req.post = post;
    next();
  });
};