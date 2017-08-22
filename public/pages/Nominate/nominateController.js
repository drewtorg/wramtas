app.controller('nominateController', function(
    $scope,
    applicationService,
    authService,
    electionService,
    nominateService,
    universitiesService,
    positionsService) {
  $scope.form = {};
  $scope.universities = {};
  $scope.positions = {};
  $scope.positionTitles = {};
  $scope.showNotice = false;
  $scope.notice = 'Thank you for submitting your nomination.  An email has been sent to the address you listed.';
  $scope.isElectionRunning = false;

  universitiesService.getUniversities().then(function(response) {
    $scope.universities = response.data;
    for (var i = 1; i <= $scope.universities.length; i += 1)
      $scope.universities[i - 1].id = i;
    $scope.form.university = $scope.universities[0];
  });

  positionsService.getPositions().then(function(response) {
    $scope.positions = response.data;
    for (var i = 1; i <= $scope.positions.length; i += 1) {
      $scope.positions[i - 1].id = i;
      var id = response.data[i - 1]._id;
      $scope.positionTitles[id] = response.data[i - 1].title;
    }
    $scope.form.position = $scope.positions[0];
  });

  applicationService.getApplications().then(function(response) {
    $scope.candidates = response.data;
  });

  electionService.getCurrentElection().then(function(election) {
    var dates = election.data;
    if (dates)
      $scope.isElectionRunning =
        Date.parse(dates.nominationStartDate) < Date.now() &&
        Date.now() < Date.parse(dates.nominationEndDate);
  });

  $scope.submitNomination = function(form) {
    $scope.showNotice = true;
    nominateService.sendNominationEmail(form);
  };

  $scope.isAdmin = function() {
    return authService.isAdmin();
  };

  $scope.hasCandidates = function(candidateGroup) {
    for (var index in candidateGroup) {
      if (candidateGroup[index]) {
        return true;
      }
    }
    return false;
  };
});
