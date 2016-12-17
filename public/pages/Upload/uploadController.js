app.controller('uploadController', function($scope, $location, authService, uploadsService) {
  if (!authService.isAdmin()) {
    $location.path('/');
  }

  $scope.files = [];

  uploadsService.getUploads().then(function(res) {
    $scope.files = res.data;
  });

  $scope.onSuccess = function(blob) {
    $scope.files.push(blob);
    uploadsService.addUpload(blob);
    $scope.$apply();
  };

  $scope.isImage = function(mimetype) {
    return mimetype.contains('image');
  };
});
