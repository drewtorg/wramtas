app.service('biosService', function($http) {
  this.getBios = function(type) {
    return $http.get('/api/v1/bios?type=' + type);
  };

  this.createBio = function(type) {
    return $http.post('/api/v1/bios?type=' + type);
  };

  this.saveBio = function(type, bio) {
    return $http.put('/api/v1/bios/' + bio._id + '?type=' + type, bio);
  };

  this.deleteBio = function(type, bio) {
    return $http.delete('/api/v1/bios/' + bio._id + '?type=' + type);
  };
});
