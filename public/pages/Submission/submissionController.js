app.controller('submissionController',
  function($scope, $routeParams, changeCaseService) {
  $scope.route = changeCaseService.toTitleCase($routeParams.route);
});
