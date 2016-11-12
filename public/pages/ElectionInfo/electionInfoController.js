app.controller('electionInfoController', function($scope, $filter, authService, electionService, positionsService, applicationService) {
  $scope.isElectionRunning = false;
  $scope.candidates = {};
  $scope.startDate = {
    opened: false
  };
  $scope.endDate = {
    opened: false
  };
  $scope.dates = {
    startDate: Date.now(),
    endDate: Date.now()
  };

  $scope.format = 'longDate'

  $scope.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2025, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  electionService.isElectionRunning().then(function(election) {
    var dates = election.data;
    if (dates)
      $scope.isElectionRunning = Date.parse(dates.startDate) < Date.now();
  });

  applicationService.getApplications().then(function(response) {
    $scope.candidates = $filter('filter')(response.data, $scope.approvedAndSubmitted);
  });

  positionsService.getPositions().then(function(response) {
    $scope.positions = {};
    for (var i = 0; i < response.data.length; i += 1) {
      var id = response.data[i]._id;
      $scope.positions[id] = response.data[i].title;
    }
  });

  $scope.hasApprovedCandidates = function(candidateGroup) {
    for (var index in candidateGroup)
      if ($scope.approvedAndSubmitted(candidateGroup[index])) {
        return true;
      }
    return false;
  };

  $scope.approvedAndSubmitted = function(candidate) {
    return candidate.approved && candidate.submitted;
  };

  $scope.toggleOpened = function(date) {
    date.opened = !date.opened;
  }

  $scope.createElection = function(dates) {
    // console.log(dates);
    $scope.isElectionRunning = dates.startDate < Date.now();
    electionService.createElection(dates);
  }

  $scope.deleteElection = function() {
    $scope.isElectionRunning = false;
    electionService.deleteElection();
  }

  $scope.isAdmin = function() {
    return authService.isAdmin();
  }
});
