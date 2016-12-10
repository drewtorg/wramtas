app.service('scholarshipsService', function($http) {
  this.uploadScholarshipApplication = function(_id, app) {
    return $http.post('/scholarship/' + _id + '/app', app)
  };

  this.saveScholarship = function(info) {
    return $http.put('/scholarship/' + info._id, info);
  };

  this.deleteScholarship = function(info) {
    return $http.delete('/scholarship/' + info._id);
  };

  this.createScholarship = function() {
    return $http.post('/scholarship');
  };

  this.getScholarships = function() {
    return $http.get('/scholarship');
  };
});