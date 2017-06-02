app.service('masterClassService', function($http, dateService) {
  this.getMasterClass = function() {
    return $http.get('/api/v1/master-class');
  };

  this.saveMasterClass = function(masterClass) {
    var backendFormat = angular.copy(masterClass);
    backendFormat.dates = dateService.toBackendDateFormat(backendFormat.dates);
    return $http.post('/api/v1/master-class', backendFormat);
  };

  this.updateIpAddressList = function() {
    return $http.post('/api/v1/master-class/count');
  };

  this.clearIpAddressList = function() {
    return $http.post('/api/v1/master-class/count/clear');
  };
});
