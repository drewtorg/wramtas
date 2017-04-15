app.service('masterClassService', function($http) {
  this.getMasterClass = function() {
    return $http.get('/api/v1/master-class');
  };

  this.saveMasterClass = function(info) {
    return $http.post('/api/v1/master-class', info);
  };
});
