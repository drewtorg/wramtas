app.service('submissionsService', function($http) {

  this.saveSubmissionInfo = function(info) {
    return $http.put('/api/v1/submission/', info);
  };

  this.deleteSubmission = function(info) {
    return $http.delete('/api/v1/submission/' + info._id);
  };

  this.createSubmission = function() {
    return $http.post('/api/v1/submission');
  };

  this.getSubmissionInfo = function() {
    return $http.get('/api/v1/submission');
  };

  this.createPrompt = function() {
    return $http.post('/api/v1/submission/prompt');
  };

  this.savePrompt = function(prompt) {
    return $http.put('/api/v1/submission/prompt/' + prompt._id, prompt);
  };

  this.deletePrompt = function(prompt) {
    return $http.delete('/api/v1/submission/prompt/' + prompt._id);
  };

  this.saveApplication = function(_id, app) {
    return $http.post('/api/v1/submission/prompt/' + _id + '/application', app);
  };
});
