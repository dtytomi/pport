'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', '$modal', '$log',
	function($scope, Authentication, Menus, $modal, $log) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

   	$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

    $scope.signup = 'modules/users/views/signup.client.view.html';
    $scope.signin = 'modules/users/views/signin.client.view.html';

    
    $scope.toggleModal = function(template){
      var modalInstance = $modal.open({
            templateUrl: template,
            backdrop: true,
            windowClass: 'modal',
            controller: 'AuthenticationController',
            scope: $scope,
          });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
        
    };

	}
]);