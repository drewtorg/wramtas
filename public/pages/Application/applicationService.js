app.service('applicationService', function($http) {
  this.submitApplication = function(info) {
    info.submitted = true;
    return $http.put('/application/' + info._id, info);
  };

  this.saveApplication = function(info) {
    return $http.put('/application/' + info._id, info);
  };

  this.getApplication = function(id) {
    return $http.get('/application/' + id);
  }
});
