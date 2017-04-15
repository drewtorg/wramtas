app.service('conferencePageService', function($http) {
  this.getConferencePage = function() {
    return $http.get('/api/v1/conference-page');
  };

  this.updateConferencePage = function(pageInfo) {
    return $http.post('/api/v1/conference-page/', pageInfo);
  };
});
