app.service('applicationService', function($http) {
  this.submitApplication = function(application) {
    application.submitted = true;
    return $http.put('/api/v1/applications/' + application._id, application);
  };

  this.saveApplication = function(application) {
    return $http.put('/api/v1/applications/' + application._id, application);
  };

  this.getApplication = function(id) {
    return $http.get('/api/v1/applications/' + id);
  }

  this.getApplications = function() {
    return $http.get('/api/v1/applications');
  }

  this.postApplication = function(application) {
    return $http.post('/api/v1/applications/' + application._id, application);
  }
});
