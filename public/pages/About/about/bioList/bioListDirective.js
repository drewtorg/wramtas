app.directive('wraBioList', function(biosService, $cookies, authService) {
  return {
    restrict: 'E',
    templateUrl: 'pages/About/about/bioList/bioList.html',
    scope: {
      type: '@'
    },
    controller: ['$scope', function($scope) {
      biosService.getBios($scope.type).then(function(res) {
        $scope.bios = res.data;
      });

      $scope.isAdmin = function() {
        return authService.isAdmin();
      };

      $scope.addBio = function() {
        var newBio = {
          inEditMode: true,
        };
        biosService.createBio($scope.type).then(function(response) {
          newBio = response.data;
          newBio.inEditMode = true;
          $scope.bios.unshift(newBio);
        });
      };
    }]
  };
});
