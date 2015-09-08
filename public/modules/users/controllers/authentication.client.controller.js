'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
    function($scope, $http, $location, Authentication) {
        $scope.authentication = Authentication;

        //If user is signed in then redirect back home
        if ($scope.authentication.user) $location.path('/');

        $scope.signup = function() {
          $http.post('/auth/signup', $scope.credentials).success(function(response) {
              //If successful we assign the response to the global user model
              $scope.authentication.user = response;
              $scope.$close('closed');
              //And redirect to the index page
              $location.path('/settings/profile');
          }).error(function(response) {
              $scope.error = response.message;
          });
        };

        $scope.signin = function() {
          console.log('I was called');
          $http.post('/auth/signin', $scope.credentials).success(function(response) {
              //If successful we assign the response to the global user model
              $scope.authentication.user = response;
              $scope.$close('closed');
              //And redirect to the index page
              $location.path('/home');
          }).error(function(response) {
              $scope.error = response.message;
          });
        };

        $scope.cancel = $scope.$dismiss;
    }
]);