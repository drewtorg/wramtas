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
});
