app.service('scholarshipPageService', function($http) {
  this.getScholarshipPage = function() {
    return $http.get('/api/v1/scholarship-page');
  };

  this.updateScholarshipPage = function(pageInfo) {
    return $http.post('/api/v1/scholarship-page/', pageInfo);
  };
});
