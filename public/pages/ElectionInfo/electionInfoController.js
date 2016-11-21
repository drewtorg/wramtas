app.controller('electionInfoController', function($scope, $filter, authService, electionService, positionsService, applicationService) {
  $scope.isElectionRunning = false;
  $scope.candidates = {};
  $scope.opened = {
    nominationStartDate: false,
    nominationEndDate: false,
    votingStartDate: false,
    votingEndDate: false
  }
  $scope.dates = {
    nominationStartDate: {
      date: Date.now(),
      opened: false
    },
    nominationEndDate: {
      date: Date.now(),
      opened: false
    },
    votingStartDate: {
      date: Date.now(),
      opened: false
    },
    votingEndDate: {
      date: Date.now(),
      opened: false
    }
  };
  $scope.format = 'MM/dd/yy H:mm a'
  $scope.dateOptions = {
    maxDate: new Date(2025, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };
  $scope.showModifiedMessage = false;
  electionService.getCurrentElection().then(function(election) {
    var dates = election.data;
    if (dates) {
      $scope.isElectionRunning = true;
      for (var prop in dates) {
        if ($scope.dates[prop])
          $scope.dates[prop].date = new Date(dates[prop]).getTime();
      }
    }
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
    $scope.isElectionRunning = true;
    electionService.createElection(dates);
  }

  $scope.modifyElection = function(dates) {
    electionService.modifyElection(dates);
    $scope.showModifiedMessage = true;
  }

  $scope.deleteElection = function() {
    $scope.isElectionRunning = false;
    electionService.deleteElection();
  }

  $scope.isAdmin = function() {
    return authService.isAdmin();
  }
});
