app.service('electionService', function($http) {
  this.getElectionInfo = function() {
    return $http.get('/api/v1/election-info');
  };

  this.saveElectionInfo = function(electionInfo) {
    return $http.post('/api/v1/election-info', electionInfo);
  };

  this.getCurrentElection = function() {
    return $http.get('/api/v1/election');
  };

  this.createElection = function(dates) {
    return $http.post('/api/v1/election', dates);
  }

  this.modifyElection = function(dates) {
    return $http.put('/api/v1/election', dates);
  }

  this.deleteElection = function() {
    return $http.delete('/api/v1/election');
  }
});
