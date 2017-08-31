app.controller('informationController',
  function($scope, $routeParams, changeCaseService) {
  $scope.route = changeCaseService.toTitleCase($routeParams.route);
});
