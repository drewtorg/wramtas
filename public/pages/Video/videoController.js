app.controller('videoController',
  function($scope, $routeParams, changeCaseService) {
  $scope.route = changeCaseService.toTitleCase($routeParams.route);
});
