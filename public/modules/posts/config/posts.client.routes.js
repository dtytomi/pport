'use strict';

angular.module('posts').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider ){

    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');
    
   //Posts State Routing
   $stateProvider.
    state('listPost', {
      url: '/posts/findByPassion/:passion',
      templateUrl: 'modules/posts/views/posts.client.view.html'
    }).
    state('userHome', {
      url: '/home',
      templateUrl: 'modules/posts/views/posts.client.view.html'
    }); 
  }
]);