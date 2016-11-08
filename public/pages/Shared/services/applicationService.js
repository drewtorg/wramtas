app.service('applicationService', function($http) {
  this.submitApplication = function(application) {
    application.submitted = true;
    return $http.put('/applications/' + application._id, application);
  };

  this.saveApplication = function(application) {
    return $http.put('/applications/' + application._id, application);
  };

  this.getApplication = function(id) {
    return $http.get('/applications/' + id);
  }

  this.getApplications = function() {
    return $http.get('/applications');
  }

  this.postApplication = function(application) {
    return $http.post('/applications/' + application._id, application);
  }
});
