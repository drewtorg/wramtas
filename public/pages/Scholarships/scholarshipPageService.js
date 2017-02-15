app.service('scholarshipPageService', function($http) {
  this.getScholarshipPage = function() {
    return $http.get('/scholarshipPage');
  };

  this.updateScholarshipPage = function(pageInfo) {
    return $http.post('/scholarshipPage/', pageInfo);
  };
});
