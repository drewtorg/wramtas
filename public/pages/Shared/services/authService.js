app.service('authService', function($http, $cookies) {
  this.isAdmin = function() {
    return this.isLoggedIn() &&
           angular.fromJson($cookies.get('session')).role === 'admin';
  };

  this.isLoggedIn = function() {
    return angular.isDefined($cookies.get('session'));
  };

  this.logIn = function(form) {
    return $http.post('/api/v1/login', form).then(function(response) {
      $cookies.put('session', angular.toJson(response.data));
    });
  };

  this.register = function(form) {
    $http.post('/api/v1/register', form).then(function(response) {
      $cookies.put('session', angular.toJson(response.data));
    });
  };

  this.logout = function(form) {
    $cookies.remove('session');
    $http.get('/api/v1/logout', form);
  };
});
