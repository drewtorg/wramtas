app.controller('uploadController', function($scope, $location, authService) {
  if (!authService.isAdmin()) {
    $location.path('/');
  }

  $scope.files = [];

  $scope.onSuccess = function(blob) {
    $scope.files.push(blob);
    console.log($scope.files);
    $scope.$apply();
  };
});
