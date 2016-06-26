app.service('biosService', function($http) {
  this.getBios = function(type) {
    return $http.get('/bios?type=' + type);
  };

  this.createBio = function(type) {
    return $http.post('/bios?type=' + type);
  };

  this.saveBio = function(type, bio) {
    return $http.put('/bios/' + bio._id + '?type=' + type, bio);
  };

  this.deleteBio = function(type, bio) {
    return $http.delete('/bios/' + bio._id + '?type=' + type);
  };
});
