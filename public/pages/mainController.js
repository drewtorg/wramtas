app.controller('mainController', function($scope, $location, $http, $cookies, authService) {
  $scope.tabs = [{
    href: '/about',
    title: 'About'
  }, {
    href: '/affiliates',
    title: 'Affiliates'
  }, {
    href: '/conference',
    title: 'Conferences',
    subtabs: [{
      href: '/conference',
      title: 'Regional and National Info'
    }, {
      href: '/scholarships',
      title: 'Conference Scholarships'
    }]
  }, {
    href: '/elections',
    title: 'Elections',
    subtabs: [{
      href: '/nominate',
      title: 'Nominate for 2017-2018'
    }, {
      href: '/candidates',
      title: 'Candidates'
    }]
  }, {
    href: '/spotlight',
    title: 'Spotlight'
  }, {
    href: '/profile',
    title: 'My WRAMTAS Profile'
  }];

  $scope.form = {
    username: '',
    password: ''
  };

  $scope.isActive = function(tab) {
    if (tab.href === $location.path())
      return true;
    if ('subtabs' in tab) {
      for (var i in tab.subtabs) {
        if (tab.subtabs[i].href === $location.path())
          return true;
      }
    }
    return false;
  };

  $scope.isDropdown = function(tab) {
    return 'subtabs' in tab;
  };

  $scope.logIn = function(form) {
    authService.logIn(form);
  };

  $scope.register = function(form) {
    authService.register(form);
  };

  $scope.isLoggedIn = function() {
    return authService.isLoggedIn();
  };

  $scope.logout = function() {
    authService.logout();
  };

  $scope.getUsername = function() {
    return angular.fromJson($cookies.get('session')).username;
  };
});