app.service('applicationService', function($http) {
  this.submitApplication = function(info) {
    return $http.put('/application?' + info._id, info);
  };
});
