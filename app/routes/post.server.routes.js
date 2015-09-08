'use strict';

var users = require('../../app/controllers/users'),
    comments = require('../../app/controllers/comments'),
    ideas = require('../../app/controllers/ideas'),
    photos = require('../../app/controllers/photos'),
    posts = require('../../app/controllers/posts'),
    rates = require('../../app/controllers/rates'),
    videos = require('../../app/controllers/videos');

module.exports = function(app) {

/************************************************
      Thougths Route
*************************************************/

  app.route('/posts/idea')
      // .get(ideas.list)
      .post(users.requiresLogin, ideas.create);

  app.route('/posts/:postId/idea/:ideaId')
      // .get(ideas.read)
      .put(users.requiresLogin, ideas.update)
      .delete(users.requiresLogin, posts.hasAuthourization, ideas.delete);

  app.route('/posts/:postId/comment')
      .post(users.requiresLogin, comments.addIdeaComment);

  app.route('/posts/:postId/comment/:commentIdeaId')
      .delete(users.requiresLogin, comments.hasAuthourization, comments.deleteIdeaComment);

  app.route('/posts/:postId/rate')
      .get(rates.avgRating)
      .post(users.requiresLogin, rates.addIdeaRate);

  // app.route('/posts/:postId/rate/:rateIdeaId')

/*************************************************
      Photo's Route
**************************************************/

   app.route('/posts/photo')
      // .get(photos.list)
      .post(users.requiresLogin, photos.create);

  app.route('/posts/:postId/photo/:photoId')
      // .get(photos.read)
      .put(users.requiresLogin, photos.update)
      .delete(users.requiresLogin, posts.hasAuthourization, photos.delete);

  app.route('/posts/:postId/comment')
      .post(users.requiresLogin, comments.addPhotoComment);

  app.route('/posts/:postId/comment/:commentPhotoId')
      .delete(users.requiresLogin, comments.hasAuthourization, comments.deletePhotoComment);

  app.route('/posts/:postId/rate')
      .get(rates.avgRating)
      .post(users.requiresLogin, rates.addPhotoRate);

  // app.route('/posts/:postId/rate/:ratePhotoId')
      

/***********************************************
    Video Route
***********************************************/

 app.route('/posts/video')
      // .get(videos.list)
      .post(users.requiresLogin, videos.create);

  app.route('/posts/:postId/video/:videoId')
      // .get(videos.read)
      .put(users.requiresLogin, videos.update)
      .delete(users.requiresLogin, posts.hasAuthourization, videos.delete);

  app.route('/posts/:postId/comment')
      .post(users.requiresLogin, comments.addVideoComment);

  app.route('/posts/:postId/comment/:commentVideoId')
      .delete(users.requiresLogin, comments.hasAuthourization, comments.deleteVideoComment);

  app.route('/posts/:postId/rate')
      .get(rates.avgRating)
      .post(users.requiresLogin, rates.addVideoRate);

  // app.route('/posts/:postId/rate/:rateVideoId');
      

  /*********************************************
    List Posts Based on Passion and Intrests
  **********************************************/
  app.route('/posts')
     .get(posts.list);

  app.route('/posts/:passion')
     .get(posts.listPost);

  // app.route('/:skill/:areaOfSpecialization')
  //    .get(posts.listSpecialities);

  /*********************************************
    List Posts Based on User
  **********************************************/
  // app.route('/user')
  //    .get(posts.userList);   

  /********************************************
    Finish By Binding Middleware
  *********************************************/
  app.param('ideaId', ideas.ideaById);
  app.param('photoId', photos.photoById);
  app.param('videoId', videos.videoById);

  app.param('postId', posts.postById);

  app.param('rateIdeaId', rates.rateIdeaById);
  app.param('ratePhotoId', rates.ratePhotoById);
  app.param('rateVideoId', rates.rateVideoById);

  app.param('commentVideoId', comments.commentVideoById);
  app.param('commentPhotoId', comments.commentPhotoById);
  app.param('commentIdeaId', comments.commentIdeaById);

};