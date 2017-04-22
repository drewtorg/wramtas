app.service('aboutPageService', function($http) {
  this.getAboutPage = function() {
    return $http.get('/api/v1/about-page');
  };

  this.updateAboutPage = function(pageInfo) {
    return $http.post('/api/v1/about-page/', pageInfo);
  };
});
