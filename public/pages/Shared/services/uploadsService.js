app.service('uploadsService', function($http) {
  this.getUploads = function() {
    return $http.get('/uploads');
  };

  this.addUpload = function(file) {
    return $http.post('/uploads', file);
  }
});
