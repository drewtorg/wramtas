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

  $scope.tabOptions = [
    {
      text: 'Remove Page',
      click: function ($itemScope) {
        var title = $itemScope.$parent.tab.title;
        $scope.removePage(title);
      }
    },
    {
      text: 'Move Page Left',
      click: function ($itemScope) {
        var title = $itemScope.$parent.tab.title;
        $scope.movePageLeft(title);
      }
    },
    {
      text: 'Move Page Right',
      click: function ($itemScope) {
        var title = $itemScope.$parent.tab.title;
        $scope.movePageRight(title);
      }
    }
  ];

  $scope.subtabOptions = [
    {
      text: 'Add Page',
      click: function() {
        $scope.addPage();
      }
    },
    {
      text: 'Remove Page',
      click: function ($itemScope) {
        var title = $itemScope.$parent.subtab.title;
        $scope.removePage(title);
      }
    },
    {
      text: 'Move Page Up',
      click: function ($itemScope) {
        var title = $itemScope.$parent.subtab.title;
        $scope.movePageUp(title);
      }
    },
    {
      text: 'Move Page Down',
      click: function ($itemScope) {
        var title = $itemScope.$parent.subtab.title;
        $scope.movePageDown(title);
      }
    }
  ];

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

  $scope.addPage = function() {
    console.log('Adding Page');
    // TODO: pop open modal w/ dropdown and give title
  };

  $scope.removePage = function(title) {
    console.log('Removing Page', title);
  };

  $scope.movePageLeft = function(title) {
    console.log('Moving Page Left', title);
  };

  $scope.movePageRight = function(title) {
    console.log('Moving Page Right', title);
  };

  $scope.movePageUp = function(title) {
    console.log('Moving Page Up', title);
  };

  $scope.movePageDown = function(title) {
    console.log('Moving Page Down', title);
  };
});
