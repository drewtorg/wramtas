app.controller('nominateController', function($scope, electionService, nominateService, universitiesService, positionsService) {
  $scope.message = 'Nominations for the 2017-2018 WRAMTAS board will open on February 13th, 2017 and close on March 13th, 2017';

  $scope.form = {};
  $scope.universities = {};
  $scope.positions = {};
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
    for (var i = 1; i <= $scope.positions.length; i += 1)
      $scope.positions[i - 1].id = i;
    $scope.form.position = $scope.positions[0];
  });

  electionService.getCurrentElection().then(function(election) {
    var dates = election.data;
    if (dates)
      $scope.isElectionRunning = Date.parse(dates.startDate) < Date.now() && Date.now() < Date.parse(dates.endDate);
  });

  $scope.submitNomination = function(form) {
    $scope.showNotice = true;
    nominateService.sendNominationEmail(form);
  };
});
