app.service('aboutPageService', function($http) {
  this.getAboutPage = function(page) {
    return $http.get('/api/v1/about-page/' + page);
  };

  this.updateAboutPage = function(page, pageInfo) {
    return $http.post('/api/v1/about-page/' + page, pageInfo);
  };

  this.deleteAboutPage = function(page) {
    return $http.delete('/api/v1/about-page/' + page);
  };
});
