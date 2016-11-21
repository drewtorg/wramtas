app.service('electionService', function($http) {
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
