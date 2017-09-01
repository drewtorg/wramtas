app.service('videoPageService', function($http, dateService) {
  this.getVideoPage = function(page) {
    return $http.get('/api/v1/video-page/' + page);
  };

  this.deleteVideoPage = function(page) {
    return $http.delete('/api/v1/video-page/' + page);
  };

  this.saveVideoPage = function(page, videoPage) {
    var backendFormat = angular.copy(videoPage);
    backendFormat.dates = dateService.toBackendDateFormat(backendFormat.dates);
    return $http.post('/api/v1/video-page/' + page, backendFormat);
  };

  this.updateIpAddressList = function(page) {
    return $http.post('/api/v1/video-page/' + page + '/count');
  };

  this.clearIpAddressList = function(page) {
    return $http.post('/api/v1/video-page/' + page + '/count/clear');
  };
});
