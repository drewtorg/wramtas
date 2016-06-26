app.directive('bioList', function(biosService) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/bioList.html',
    scope: {
      type: '@'
    },
    controller: ['$scope', function($scope) {
      biosService.getBios($scope.type).then(function(res) {
        $scope.bios = res.data;
      });
    }]
  }
});
