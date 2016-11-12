app.service('voteService', function($http) {
  this.sendBallot = function(info) {
    return $http.put('/vote', info);
  };
});
