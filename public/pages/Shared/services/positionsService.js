app.service('positionsService', function($http) {
  this.getPositions = function() {
    return $http.get('/positions');
  };
});
