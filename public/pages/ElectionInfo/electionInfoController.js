app.controller('electionInfoController', function($scope, authService, electionService) {
  $scope.createElection = function(dates) {
    electionService.createElection(dates);
  }

  $scope.deleteElection = function() {
    electionService.deleteElection();
  }

  $scope.isAdmin = function() {
    return authService.isAdmin();
  }
});
