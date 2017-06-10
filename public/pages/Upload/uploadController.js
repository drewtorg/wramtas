app.controller('uploadController', function(
    $scope,
    $location,
    authService,
    uploadsService) {
  if (!authService.isAdmin()) {
    $location.path('/');
  }

  $scope.files = [];
  $scope.currentPage = 1;
  $scope.itemsPerPage = 5;

  uploadsService.getUploads().then(function(res) {
    $scope.files = res.data;
  });

  $scope.onSuccess = function(blob) {
    $scope.files.unshift(blob);
    uploadsService.addUpload(blob);
    $scope.$apply();
  };

  $scope.getSource = function(file) {
    if (file.mimetype.contains('image')) return file.url;
    return 'no_preview.jpg';
  };

  $scope.isImage = function(file) {
    return file.mimetype.contains('image');
  };

  $scope.isPdf = function(file) {
    return file.mimetype.contains('pdf');
  };
});
