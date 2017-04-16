app.controller('electionInfoController', function(
    $scope,
    $sce,
    $filter,
    authService,
    electionService,
    positionsService,
    applicationService,
    TINY_MCE_OPTIONS) {
  $scope.tinymceOptions = TINY_MCE_OPTIONS;
  $scope.isElectionRunning = false;
  $scope.candidates = {};
  $scope.opened = {
    nominationStartDate: false,
    nominationEndDate: false,
    votingStartDate: false,
    votingEndDate: false
  };
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
  $scope.format = 'MM/dd/yy h:mm a';
  $scope.dateOptions = {
    maxDate: new Date(2025, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };
  $scope.showModifiedMessage = false;
  $scope.electionInfo = {
    inEditMode: false,
    html: ''
  };
  $scope.tempElectionInfo = {
    inEditMode: false,
    html: ''
  };
  $scope.isElectionOver = false;

  electionService.getCurrentElection().then(function(election) {
    var dates = election.data;
    if (dates) {
      $scope.isElectionRunning = true;
      $scope.isElectionOver = Date.now() > Date.parse(dates.votingEndDate);
      for (var prop in dates) {
        if ($scope.dates[prop])
          $scope.dates[prop].date = new Date(dates[prop]).getTime();
      }
    }
  });

  electionService.getElectionInfo().then(function(res) {
    if (res.data)
      $scope.electionInfo.html = res.data.html;
    else
      $scope.electionInfo.html = 'Election Information goes here.';
  });

  applicationService.getApplications().then(function(response) {
    $scope.candidates =
      $filter('filter')(response.data, $scope.approvedAndSubmitted);
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
  };

  $scope.createElection = function(dates) {
    $scope.isElectionRunning = true;
    electionService.createElection(dates);
  };

  $scope.modifyElection = function(dates) {
    electionService.modifyElection(dates);
    $scope.showModifiedMessage = true;
  };

  $scope.deleteElection = function() {
    $scope.isElectionRunning = false;
    electionService.deleteElection();
  };

  $scope.isAdmin = function() {
    return authService.isAdmin();
  };

  $scope.editElectionInfo = function() {
    $scope.tempElectionInfo = angular.copy($scope.electionInfo);
    $scope.electionInfo.inEditMode = true;
  };

  $scope.saveElectionInfo = function() {
    electionService.saveElectionInfo($scope.electionInfo);
    $scope.electionInfo.html = angular.copy($scope.tempElectionInfo.html);
    $scope.electionInfo.inEditMode = false;
  };

  $scope.undoEdits = function() {
    $scope.tempElectionInfo.html = angular.copy($scope.electionInfo.html);
    $scope.electionInfo.inEditMode = false;
  };

  $scope.trustAsHtml = function(string) {
    return $sce.trustAsHtml(string);
  };

  $scope.getElectionWinner = function(candidates) {
    var maxVotes = Math.max.apply(null, candidates.map(function(candidate) {
      return candidate.votes;
    }));
    var winner = candidates.filter(function(candidate) {
      return candidate.votes === maxVotes;
    })[0];
    return winner.name;
  };
});
