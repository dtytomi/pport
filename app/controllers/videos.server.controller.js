'use strict';


var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Post = mongoose.model('Post'),
    Video = mongoose.model('Video'),
    _ = require('lodash');

/**
* Get the error message from the error object
**/

var getErrorMessage = function (err) {
  var message = '';

  if (err) {
    switch(err.code) {
      case 11000:
      case 11001:
        message = 'Video already exists';
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
* Create Video
**/
exports.create = function(req, res) {

  var post = new Post();
  var video = new Video(req.body);

  post.user = req.user;
  
  post.videos.unshift(video);

  post.save(function(err) {
      if (err) {
        return res.send(400, {
          message: getErrorMessage(err)
        });
      } else{
        res.jsonp(video);
      }
  });
};

/**
* Show the current Thought
**/
// exports.read = function(req, res) {
//   res.jsonp(req.video);
// };

/**
* Update Video
**/
exports.update = function(req, res) {
  var post = post,
      video = req.video;

  video = _.extend(video, req.body);

  post.save(function(err) {
    if (err) {
      return res.send(400, {
        message: getErrorMessage(err)
      });
    } else{
      res.jsonp(video);
    }
  });
};

/**
* Delete Video
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
exports.videoById = function(req, res, next, id) {
  req.video = req.post.videos.id(id);
  next();
};