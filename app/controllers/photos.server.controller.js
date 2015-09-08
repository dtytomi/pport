'use strict';


var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Post = mongoose.model('Post'),
    Photo = mongoose.model('Photo'),

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
        message = 'Thoughts already exists';
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
* Create Photo
**/
exports.create = function(req, res) {

  var post = new Post();
  var photo = new Photo(req.body);

  post.user = req.user;
  
  post.photos.unshift(photo);

  post.save(function(err) {
      if (err) {
        return res.send(400, {
          message: getErrorMessage(err)
        });
      } else{
        res.jsonp(photo);
      }
  });
};

/**
* Show the current Photo
**/
// exports.read = function(req, res) {
//   res.jsonp(req.photo);
// };

/**
* Update Photo
**/
exports.update = function(req, res) {
  var post = req.post,
      photo = req.photo;

  photo = _.extend(photo, req.body);

  post.save(function(err) {
    if (err) {
      return res.send(400, {
        message: getErrorMessage(err)
      });
    } else{
        res.jsonp(photo);
    }
  });
};

/**
* Delete photo
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
*   Photo   Middleware
********************************************/

exports.photoById = function(req, res, next, id) {
  req.photo = req.post.photos.id(id);
  next();
};