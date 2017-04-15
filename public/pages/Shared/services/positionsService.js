app.service('positionsService', function($http) {
  this.getPositions = function() {
    return $http.get('/api/v1/positions');
  };
});
