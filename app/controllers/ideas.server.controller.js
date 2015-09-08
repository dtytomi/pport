'use strict';


var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Idea = mongoose.model('Idea'),
    Post = mongoose.model('Post'),
    _ = require('lodash');

/**
* Get the error message from the error object
**/

var getErrorMessage = function(err) {
  var message = '';

  if (err.code) {
    switch(err.code) {
      case 11000:
      case 11001:
        message = 'Idea already exists';
        break;
        default: 
          message = 'Something went wrong';
    }
  } else{
      for (var errName in err.errors) {
        if (err.errors[errName].message) message = err.errors[errName].message;
      }
  }

  return message;

};

/**
* Create Idea
**/
exports.create = function(req, res) {

  var post = new Post();
  var idea = new Idea(req.body);

  post.user = req.user;
  
  post.ideas.unshift(idea);

  post.save(function(err) {
      if (err) {
        return res.send(400, {
          message: getErrorMessage(err)
        });
      } else{
        res.jsonp(post);
      }
  });
};

/**
* Show the current Idea
**/
// exports.read = function(req, res) {
//   res.jsonp(req.idea);
// };

/**
* Update Idea
**/
exports.update = function(req, res) {
  var post = req.post,
      idea = req.idea;

  idea = _.extend(idea, req.body);

  post.save(function(err) {
    if (err) {
      return res.send(400, {
        message: getErrorMessage(err)
      });
    } else{
        res.jsonp(idea);
    }
  });
};

/**
* Delete Idea
**/
exports.delete = function(req, res) {
  var post = req.post;

  post.remove(function(err) {
      if (err) {
        return res.send(400, {
          message: getErrorMessage(err)
        });
      } else{
        res.jsonp(post);
      }
  });
};

/*******************************************
*   Idea   Middleware
********************************************/

exports.ideaById = function(req, res, next, id) {
  req.idea = req.post.ideas.id(id);
  next();
};