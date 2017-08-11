app.service('submissionsService', function($http) {
  this.saveSubmissionInfo = function(info) {
    return $http.put('/api/v1/submission/' + info.type, info);
  };

  this.deleteSubmission = function(info) {
    return $http.delete('/api/v1/submission/' + info._id);
  };

  this.createSubmission = function() {
    return $http.post('/api/v1/submission');
  };

  this.getSubmissionInfo = function(type) {
    return $http.get('/api/v1/submission/' + type);
  };

  this.createPrompt = function(type) {
    return $http.post('/api/v1/submission/' + type + '/prompt');
  };

  this.savePrompt = function(type, prompt) {
    return $http.put('/api/v1/submission/' + type + '/prompt/' +
      prompt._id, prompt);
  };

  this.deletePrompt = function(type, prompt) {
    return $http.delete('/api/v1/submission/' + type +
      '/prompt/' + prompt._id);
  };

  this.saveApplication = function(type, _id, app) {
    return $http.post('/api/v1/submission/' + type +
      '/prompt/' + _id + '/application', app);
  };
});
