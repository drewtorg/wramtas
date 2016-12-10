app.service('conferencePageService', function($http) {
  this.getConferencePage = function() {
    return $http.get('/conferencePage');
  };

  this.updateConferencePage = function(pageInfo) {
    return $http.post('/conferencePage/', pageInfo);
  };
});
