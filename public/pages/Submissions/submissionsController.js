app.controller('submissionsController', function(
    $scope,
    $sce,
    authService,
    submissionPageService,
    TINY_MCE_OPTIONS) {
  $scope.message = '';
  $scope.submission = {};

  $scope.tinymceOptions = TINY_MCE_OPTIONS;
  $scope.submissionInfo = {
    inEditMode: false,
    html: ''
  };
  $scope.tempSubmissionInfo = {
    inEditMode: false,
    html: ''
  };

  submissionPageService.getSubmissionPage().then(function(res) {
    if (res.data)
      $scope.submissionInfo.html = res.data.html;
    else
      $scope.submissionInfo.html = 'Submission Information goes here.';
  });

  $scope.editSubmissionInfo = function() {
    $scope.tempSubmissionInfo = angular.copy($scope.submissionInfo);
    $scope.submissionInfo.inEditMode = true;
  };

  $scope.saveSubmissionInfo = function() {
    submissionPageService.updateSubmissionPage($scope.submissionInfo);
    $scope.submissionInfo.html = angular.copy($scope.tempSubmissionInfo.html);
    $scope.submissionInfo.inEditMode = false;
  };

  $scope.undoEdits = function() {
    $scope.tempSubmissionInfo.html = angular.copy($scope.submissionInfo.html);
    $scope.submissionInfo.inEditMode = false;
  };

  $scope.trustAsHtml = function(string) {
    return $sce.trustAsHtml(string);
  };

  $scope.isAdmin = function() {
    return authService.isAdmin();
  };
});
