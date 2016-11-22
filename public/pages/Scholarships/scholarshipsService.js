app.service('scholarshipsService', function($http) {
  this.uploadScholarshipApplication = function(info) {
    console.log('Upload!');
  };

  this.saveScholarship = function(info) {
    $http.put('/scholarship/' + info._id, info);
  };

  this.deleteScholarship = function(info) {
    $http.delete('/scholarship/' + info._id);
  };

  this.createScholarship = function() {
    $http.post('/scholarship/');
  };

  this.getScholarships = function() {
    $http.get('/scholarship');
  }
});
