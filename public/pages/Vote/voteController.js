app.controller('voteController', function($scope, $filter, $interval, applicationService, positionsService, usSpinnerService) {
  $scope.message = 'Vote here!';
  $scope.spinning = false;
  $scope.showVotePanel = false;
  $scope.candidates = {};
  $scope.ballot = {};
  $scope.positions = {};
  $scope.voted = false;

  $scope.spinnerOpts = {
    radius: 20,
    width: 8,
    length: 16
  }

  applicationService.getApplications().then(function(response) {
    $scope.candidates = $filter('filter')(response.data, $scope.approvedAndSubmitted);
  });

  $scope.hasApprovedCandidates = function(candidateGroup) {
    for (var index in candidateGroup)
      if ($scope.approvedAndSubmitted(candidateGroup[index]))
        return true;
    return false;
  };

  $scope.approvedAndSubmitted = function(candidate) {
    return candidate.approved && candidate.submitted;
  };

  positionsService.getPositions().then(function(response) {
    $scope.positions = {};
    for (var i = 0; i < response.data.length; i += 1) {
      var id = response.data[i]._id;
      $scope.positions[id] = response.data[i].title;
    }
  });

  $scope.showSpinner = function() {
    $scope.spinning = true;
    usSpinnerService.spin('spinner');
    $interval(function() {
      $scope.spinning = false;
      $scope.showVotePanel = true;
      usSpinnerService.stop('spinner');
    }, 3000, 0, 1);
  }

  $scope.castVote = function(ballot) {
    console.log(ballot);
  }
});
