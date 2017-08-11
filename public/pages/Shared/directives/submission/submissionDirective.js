app.directive('wraSubmission', function(
    $sce,
    authService,
    dateService,
    submissionsService,
    TINY_MCE_OPTIONS) {
  return {
    restrict: 'E',
    templateUrl: 'pages/Shared/directives/submission/submission.html',
    scope: {
      type: '@'
    },
    controller: ['$scope', function($scope) {
      $scope.message = '';
      $scope.submission = {};

      $scope.tinymceOptions = TINY_MCE_OPTIONS;
      $scope.submissionInfo = {
        inEditMode: false,
        description: '',
        prompts: []
      };
      $scope.tempSubmissionInfo = {
        inEditMode: false,
        description: '',
        prompts: []
      };

      submissionsService.getSubmissionInfo($scope.type).then(function(res) {
        if (res.data && res.data.description) {
          $scope.submissionInfo = res.data;
          $scope.submissionInfo.prompts.forEach(function(prompt) {
            prompt.dates = dateService.toUIDateFormat(prompt.dates);
          });
        }
        else {
          $scope.submissionInfo.description =
            $scope.submissionInfo.type + ' Information goes here.';
        }
      });

      $scope.editSubmissionInfo = function() {
        $scope.tempSubmissionInfo = angular.copy($scope.submissionInfo);
        $scope.submissionInfo.inEditMode = true;
      };

      $scope.saveSubmissionInfo = function() {
        $scope.submissionInfo = angular.copy($scope.tempSubmissionInfo);
        submissionsService.saveSubmissionInfo($scope.submissionInfo);
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
    }]
  };
});
