app.directive('wraSubmissionPromptList', function(
    $sce,
    authService,
    dateService,
    submissionsService) {
  return {
    restrict: 'E',
    templateUrl: 'pages/Shared/directives/submission/promptList/promptList.html',
    scope: {
      page: '@',
      prompts: '='
    },
    controller: ['$scope', function($scope) {
      $scope.isAdmin = function() {
        return authService.isAdmin();
      };

      $scope.addPrompt = function() {
        submissionsService.createPrompt($scope.page).then(function(response) {
          var prompt = angular.copy(response.data);
          prompt.dates = dateService.toUIDateFormat(prompt.dates);
          prompt.fields = [];
          prompt.inEditMode = true;
          $scope.prompts.push(angular.copy(prompt));
        });
      };
    }]
  };
});
