app.controller('mainController', function($scope, $location, $http, $cookies, authService, filepickerService) {
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
      href: '/election-info',
      title: 'General Election Information'
    }, {
      href: '/nominate',
      title: 'Nominate WRAMTAS Members'
    }, {
      href: '/candidates',
      title: 'View Candidates'
    }, {
      href: '/vote',
      title: 'Vote for WRAMTAS Board'
    }]
  }, {
    href: '/spotlight',
    title: 'Spotlight'
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
    authService.logIn(form).then(function() {
      if (authService.isAdmin()) {
        $scope.tabs.push({
          href: '/upload',
          title: 'Uploads'
        });
      }
    });
  };

  $scope.register = function(form) {
    authService.register(form);
  };

  $scope.isLoggedIn = function() {
    return authService.isLoggedIn();
  };

  $scope.logout = function() {
    authService.logout();
    $scope.tabs.pop();
    if ($location.path() === '/upload') {
      $location.path('/');
    }
  };

  $scope.isAdmin = function() {
    return authService.isAdmin();
  };

  $scope.getUsername = function() {
    return angular.fromJson($cookies.get('session')).username;
  };

  if (authService.isAdmin()) {
    $scope.tabs.push({
      href: '/upload',
      title: 'Uploads'
    });
  }
});
