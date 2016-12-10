app.service('aboutPageService', function($http) {
  this.getAboutPage = function() {
    return $http.get('/aboutPage');
  };

  this.updateAboutPage = function(pageInfo) {
    return $http.post('/aboutPage/', pageInfo);
  };
});
