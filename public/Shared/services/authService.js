app.service('authService', function($http, $cookies) {
  this.isAdmin = function() {
    return this.isLoggedIn() && angular.fromJson($cookies.get('session')).role === 'admin';
  };

  this.isLoggedIn = function() {
    return angular.isDefined($cookies.get('session'));
  };

  this.logIn = function(form) {
    $http.post('/login', form).then(function(response) {
      $cookies.put('session', angular.toJson(response.data));
    });
  };

  this.register = function(form) {
    $http.post('/register', form).then(function(response) {
      $cookies.put('session', angular.toJson(response.data));
    });
  };

  this.logout = function(form) {
    $cookies.remove('session');
    $http.get('/logout', form);
  };
});
