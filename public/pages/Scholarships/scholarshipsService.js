app.service('scholarshipsService', function($http) {
  this.uploadScholarshipApplication = function(_id, app) {
    return $http.post('/api/v1/scholarship/' + _id + '/app', app)
  };

  this.saveScholarship = function(info) {
    return $http.put('/api/v1/scholarship/' + info._id, info);
  };

  this.deleteScholarship = function(info) {
    return $http.delete('/api/v1/scholarship/' + info._id);
  };

  this.createScholarship = function() {
    return $http.post('/api/v1/scholarship');
  };

  this.getScholarships = function() {
    return $http.get('/api/v1/scholarship');
  };
});
