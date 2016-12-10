app.service('electionService', function($http) {
  this.getElectionInfo = function() {
    return $http.get('/electionInfo');
  };

  this.saveElectionInfo = function(electionInfo) {
    return $http.post('/electionInfo', electionInfo);
  };

  this.getCurrentElection = function() {
    return $http.get('/election');
  };

  this.createElection = function(dates) {
    return $http.post('/election', dates);
  }

  this.modifyElection = function(dates) {
    return $http.put('/election', dates);
  }

  this.deleteElection = function() {
    return $http.delete('/election');
  }
});
