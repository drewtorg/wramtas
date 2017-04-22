app.service('nominateService', function($http) {
  this.sendNominationEmail = function(info) {
    return $http.post('/api/v1/nominate', info);
  };
});
