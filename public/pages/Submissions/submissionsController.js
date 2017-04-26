app.controller('submissionsController', function(
    $scope,
    $sce,
    authService,
    dateService,
    submissionPageService,
    TINY_MCE_OPTIONS) {
  $scope.message = '';
  $scope.submission = {};

  $scope.tinymceOptions = TINY_MCE_OPTIONS;
  $scope.submissionInfo = {
    inEditMode: false,
    description: ''
  };
  $scope.tempSubmissionInfo = {
    inEditMode: false,
    description: ''
  };

  submissionPageService.getSubmissionPage().then(function(res) {
    if (res.data) {
      $scope.submissionInfo = res.data;
      // need to format the dates
      $scope.submissionInfo.dates = dateService.toUIDateFormat(res.data);
    }
    else
      $scope.submissionInfo.description = 'Submission Information goes here.';
  });

  $scope.editSubmissionInfo = function() {
    $scope.tempSubmissionInfo = angular.copy($scope.submissionInfo);
    $scope.submissionInfo.inEditMode = true;
  };

  $scope.saveSubmissionInfo = function() {
    // need to format the dates
    submissionPageService.updateSubmissionPage(
      dateService.toBackendDateFormat($scope.submissionInfo));
    $scope.submissionInfo = angular.copy($scope.tempSubmissionInfo);
    $scope.submissionInfo.inEditMode = false;
  };

  $scope.undoEdits = function() {
    $scope.tempSubmissionInfo = angular.copy($scope.submissionInfo);
    $scope.submissionInfo.inEditMode = false;
  };

  $scope.trustAsHtml = function(string) {
    return $sce.trustAsHtml(string);
  };

  $scope.isAdmin = function() {
    return authService.isAdmin();
  };
});
