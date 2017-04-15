app.service('uploadsService', function($http) {
  this.getUploads = function() {
    return $http.get('/api/v1/uploads');
  };

  this.addUpload = function(file) {
    return $http.post('/api/v1/uploads', file);
  }
});
