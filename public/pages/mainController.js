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
    authService.logIn(form).then(function() {
      // TODO: Remove once uploads page removal is final
      // if (authService.isAdmin()) {
      //   $scope.tabs.push({
      //     href: '/upload',
      //     title: 'Uploads'
      //   });
      // }
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
    // TODO: Remove once uploads page removal is final
    // $scope.tabs.pop();
    // if ($location.path() === '/upload') {
    //   $location.path('/');
    // }
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

  $scope.menuOptions = [
    // NEW IMPLEMENTATION
    {
        text: 'Object-Select',
        click: function ($itemScope, $event, modelValue, text, $li) {
            $scope.selected = $itemScope.item.name;
        }
    },
    {
        text: 'Object-Remove',
        click: function ($itemScope, $event, modelValue, text, $li) {
            $scope.items.splice($itemScope.$index, 1);
        }
    },
    // LEGACY IMPLEMENTATION
    ['Select', function ($itemScope, $event, modelValue, text, $li) {
        $scope.selected = $itemScope.item.name;
    }],
    null, // Dividier
    ['Remove', function ($itemScope, $event, modelValue, text, $li) {
        $scope.items.splice($itemScope.$index, 1);
    }]
];

  // TODO: Remove once uploads page removal is final
  // if (authService.isAdmin()) {
  //   $scope.tabs.push({
  //     href: '/upload',
  //     title: 'Uploads'
  //   });
  // }
});
