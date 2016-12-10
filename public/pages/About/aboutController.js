app.controller('aboutController', function($scope, $sce, authService, aboutPageService) {
  $scope.pageInfo = {
    descripton: '',
    contactEmail: '',
    boardImage: '',
    inEditMode: false
  };
  $scope.tempPageInfo = {
    descripton: '',
    contactEmail: '',
    boardImage: '',
    inEditMode: false
  };
  $scope.uploader = {};

  aboutPageService.getAboutPage().then(function(res) {
    if (res.data)
      $scope.pageInfo = res.data;
    else {
      $scope.pageInfo.description = 'Description of the WRAMTAS organization goes here.'
      $scope.pageInfo.contactEmail = 'default@gmail.com'
    }
  });

  $scope.updateAboutPage = function() {
    $scope.pageInfo = angular.copy($scope.tempPageInfo);
    $scope.pageInfo.inEditMode = false;
    if ($scope.uploader.flow.files.length)
      $scope.uploader.flow.upload();
    else
      aboutPageService.updateAboutPage($scope.pageInfo).then(function(response) {
        $scope.pageInfo.inEditMode = false;
      });
  }

  $scope.editAboutPage = function() {
    $scope.tempPageInfo = angular.copy($scope.pageInfo);
    $scope.pageInfo.inEditMode = true;
  }

  $scope.undoEdits = function() {
    $scope.tempElectionInfo = angular.copy($scope.electionInfo);
    $scope.uploader.flow.cancel();
    $scope.pageInfo.inEditMode = false;
  }

  $scope.trustAsHtml = function(html) {
    return $sce.trustAsHtml(html);
  }

  $scope.isAdmin = function() {
    return authService.isAdmin();
  }

  $scope.onFileUploadSuccess = function($message) {
    var res = JSON.parse($message);
    $scope.pageInfo.boardImage = angular.copy('uploads/' + res.filename);

    aboutPageService.updateAboutPage($scope.pageInfo).then(function(response) {
      $scope.pageInfo.inEditMode = false;
    });
  }
});
