app.service('submissionsService', function($http) {
  this.uploadSubmissionApplication = function(_id, app) {
    return $http.post('/api/v1/submission/' + _id + '/application', app);
  };

  this.saveSubmission = function(info) {
    return $http.put('/api/v1/submission/' + info._id, info);
  };

  this.deleteSubmission = function(info) {
    return $http.delete('/api/v1/submission/' + info._id);
  };

  this.createSubmission = function() {
    return $http.post('/api/v1/submission');
  };

  this.getSubmissions = function() {
    return $http.get('/api/v1/submission');
  };
});
