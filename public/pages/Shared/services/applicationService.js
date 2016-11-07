app.service('applicationService', function($http) {
  this.submitApplication = function(info) {
    info.submitted = true;
    return $http.put('/applications/' + info._id, info);
  };

  this.saveApplication = function(info) {
    return $http.put('/applications/' + info._id, info);
  };

  this.getApplication = function(id) {
    return $http.get('/applications/' + id);
  }

  this.getApplications = function() {
    return $http.get('/applications');
  }

  this.rejectApplication = function(id) {
    return $http.delete('/applications/' + id);
  }

  this.approveApplication = function(id) {
    return $http.post('/applications/' + id);
  }
});
