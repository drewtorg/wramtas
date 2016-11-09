app.controller('voteController', function($scope, $interval, positionsService, usSpinnerService) {
  $scope.message = 'Vote here!';
  $scope.spinning = false;
  $scope.showVotePanel = false;

  $scope.spinnerOpts = {
    radius: 20,
    width: 8,
    length: 16
  }

  $scope.showSpinner = function() {
    $scope.spinning = true;
    usSpinnerService.spin('spinner');
    $interval(function() {
      $scope.spinning = false;
      $scope.showVotePanel = true;
      usSpinnerService.stop('spinner');
    }, 3000, 1);
  }
});
