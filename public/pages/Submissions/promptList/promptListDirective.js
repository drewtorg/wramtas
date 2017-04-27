app.directive('wraSubmissionPromptList', function(
    $sce,
    authService,
    dateService,
    submissionsService) {
  return {
    restrict: 'E',
    templateUrl: 'pages/Submissions/promptList/promptList.html',
    scope: {
      type: '@',
      prompts: '='
    },
    controller: ['$scope', function($scope) {
      $scope.isAdmin = function() {
        return authService.isAdmin();
      };

      $scope.addPrompt = function() {
        submissionsService.createPrompt().then(function(response) {
          response.data.dates = dateService.toUIDateFormat(response.data.dates);
          response.data.inEditMode = true;
          $scope.prompts.push(angular.copy(response.data));
        });
      };
    }]
  };
});
