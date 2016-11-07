app.service('universitiesService', function($http) {
  this.getUniversities = function() {
    return $http.get('/universities');
  };
});
