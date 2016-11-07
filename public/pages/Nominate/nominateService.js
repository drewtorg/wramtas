app.service('nominateService', function($http) {
  this.sendNominationEmail = function(info) {
    return $http.post('/nominate', info);
  };
});
