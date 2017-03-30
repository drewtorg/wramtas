app.service('masterClassService', function($http) {
  this.getMasterClass = function() {
    return $http.get('/masterclass');
  };

  this.saveMasterClass = function(info) {
    return $http.post('/masterclass/' + info);
  };
});
