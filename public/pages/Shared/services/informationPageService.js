app.service('informationPageService', function($http) {
  this.getInformationPage = function(page) {
    return $http.get('/api/v1/information-page/' + page);
  };

  this.updateInformationPage = function(page, data) {
    return $http.post('/api/v1/information-page/' + page, data);
  };

  this.deleteInformationPage = function(page) {
    return $http.delete('/api/v1/information-page/' + page);
  };
});
