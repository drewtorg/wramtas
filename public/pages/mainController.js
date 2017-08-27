app.controller('mainController', function(
    $scope,
    $location,
    $http,
    $cookies,
    authService,
    TABS) {
  $scope.tabs = TABS;
  $scope.editingTabs = false;

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

  $scope.isAdmin = function() {
    return authService.isAdmin();
  };

  $scope.getUsername = function() {
    return angular.fromJson($cookies.get('session')).username;
  };

  $scope.toggleEditing = function() {
    $scope.editingTabs = !$scope.editingTabs;
  };

  $scope.tabOptions = [
    {
        text: 'Remove Page',
        click: function ($itemScope, $event, modelValue, text, $li) {
            $scope.removePage(); // pass in relevant information
        }
    }
  ];

  $scope.subtabOptions = [
    {
        text: 'Add Page',
        click: function ($itemScope, $event, modelValue, text, $li) {
            $scope.addPage();
        }
    },
    {
        text: 'Remove Page',
        click: function ($itemScope, $event, modelValue, text, $li) {
            $scope.removePage(); // pass in relevant information
        }
    }
  ];
});
