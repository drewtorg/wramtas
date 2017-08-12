app.service('submissionsService', function($http) {
  this.saveSubmissionInfo = function(info) {
    return $http.put('/api/v1/submission/' + info.page, info);
  };

  this.deleteSubmission = function(info) {
    return $http.delete('/api/v1/submission/' + info._id);
  };

  this.createSubmission = function() {
    return $http.post('/api/v1/submission');
  };

  this.getSubmissionInfo = function(page) {
    return $http.get('/api/v1/submission/' + page);
  };

  this.createPrompt = function(page) {
    return $http.post('/api/v1/submission/' + page + '/prompt');
  };

  this.savePrompt = function(page, prompt) {
    return $http.put('/api/v1/submission/' + page + '/prompt/' +
      prompt._id, prompt);
  };

  this.deletePrompt = function(page, prompt) {
    return $http.delete('/api/v1/submission/' + page +
      '/prompt/' + prompt._id);
  };

  this.saveApplication = function(page, _id, app) {
    return $http.post('/api/v1/submission/' + page +
      '/prompt/' + _id + '/application', app);
  };
});
