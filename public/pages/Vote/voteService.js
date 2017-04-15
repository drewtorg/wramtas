app.service('voteService', function($http) {
  this.sendBallot = function(info) {
    return $http.put('/api/v1/vote', info);
  };
});
