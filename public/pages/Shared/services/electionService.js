app.service('electionService', function($http) {
  this.isElectionRunning = function() {
    return $http.get('/election');
  };

  this.createElection = function(dates) {
    return $http.post('/election', dates);
  }

  this.deleteElection = function() {
    return $http.delete('/election');
  }
});
