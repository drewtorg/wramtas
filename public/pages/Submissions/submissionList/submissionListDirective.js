app.directive('wraSubmissionList', function(
    $sce,
    authService,
    submissionsService) {
  return {
    restrict: 'E',
    templateUrl: 'pages/Submissions/submissionList/submissionList.html',
    controller: ['$scope', function($scope) {
      submissionsService.getSubmissions().then(function(response) {
        $scope.submissionApps = response.data;
      });

      $scope.isAdmin = function() {
        return authService.isAdmin();
      };

      $scope.addSubmissionApp = function() {
        var newApp = {
          prompt: '',
          inEditMode: true,
        };
        submissionsService.createSubmission().then(function(response) {
          newApp._id = response.data._id;
          $scope.submissionApps.push(newApp);
        });
      };
    }]
  };
});
