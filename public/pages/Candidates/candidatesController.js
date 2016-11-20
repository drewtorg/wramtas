app.controller('candidatesController', function($scope, $filter, $sce, applicationService, authService, electionService, positionsService) {
  $scope.candidates = {};
  $scope.buttonText = {};
  $scope.isElectionRunning = false;

  applicationService.getApplications().then(function(response) {
    $scope.candidates = response.data;
    $scope.candidates.forEach(function(element) {
      $scope.buttonText[element._id] = 'Reject';
    });
  });

  positionsService.getPositions().then(function(response) {
    $scope.positions = {};
    for (var i = 0; i < response.data.length; i += 1) {
      var id = response.data[i]._id;
      $scope.positions[id] = response.data[i].title;
    }
  });

  electionService.gtCurrentElection().then(function(election) {
    var dates = election.data;
    if (dates)
      $scope.isElectionRunning = Date.parse(dates.startDate) < Date.now() && Date.now() < Date.parse(dates.endDate);
  });

  $scope.isAdmin = function() {
    return authService.isAdmin();
  };

  $scope.trustAsHtml = function(string) {
    return $sce.trustAsHtml(string);
  };

  $scope.hasApprovedCandidates = function(candidateGroup) {
    for (var index in candidateGroup)
      if ($scope.approvedAndSubmitted(candidateGroup[index]))
        return true;
    return false;
  };

  $scope.hasSubmittedCandidates = function(candidateGroup) {
    for (var index in candidateGroup)
      if ($scope.notApprovedAndSubmitted(candidateGroup[index]))
        return true;
    return false;
  };

  $scope.approvedAndSubmitted = function(candidate) {
    return candidate.approved && candidate.submitted;
  };

  $scope.notApprovedAndSubmitted = function(candidate) {
    return !candidate.approved && candidate.submitted;
  };

  $scope.approveApplication = function(candidate) {
    candidate.approved = true;
    applicationService.postApplication(candidate);
  }

  $scope.toggleReject = function(candidate) {
    if ($scope.buttonText[candidate._id] === 'Reject')
      $scope.buttonText[candidate._id] = 'Cancel';
    else
      $scope.buttonText[candidate._id] = 'Reject';
  }

  $scope.showRejectReason = function(candidate) {
    return $scope.buttonText[candidate._id] === 'Cancel';
  }

  $scope.rejectButtonText = function(candidate) {
    return $scope.buttonText[candidate._id];
  }

  $scope.rejectApplication = function(candidate) {
    candidate.submitted = false;
    candidate.approved = false;
    candidate.positionName = $scope.positions[candidate.position];
    $scope.toggleReject(candidate);
    applicationService.postApplication(candidate);
  }
});
