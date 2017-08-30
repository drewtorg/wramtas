app.controller('mainController', function(
    $scope,
    $location,
    $http,
    $cookies,
    authService,
    pageListService) {
  $scope.tabs = {};
  $scope.editingTabs = false;

  $scope.form = {
    username: '',
    password: ''
  };

  $scope.tabOptions = [
    {
      text: 'Remove Page',
      click: function ($itemScope) {
        var tabIndex = $itemScope.$parent.$index;
        var pageType = $itemScope.$parent.tab.pageType;
        $scope.removePage(pageType, tabIndex);
      }
    },
    {
      text: 'Move Page Left',
      click: function ($itemScope) {
        $scope.movePageLeft($itemScope.$parent.$index);
      }
    },
    {
      text: 'Move Page Right',
      click: function ($itemScope) {
        $scope.movePageRight($itemScope.$parent.$index);
      }
    }
  ];

  $scope.subtabOptions = [
    {
      text: 'Add Page',
      click: function($itemScope) {
        var tabIndex = $itemScope.$parent.$parent.$parent.$index;
        var subtabIndex = $itemScope.$parent.$index;
        $scope.addPage(tabIndex, subtabIndex);
      }
    },
    {
      text: 'Remove Page',
      click: function ($itemScope) {
        var tabIndex = $itemScope.$parent.$parent.$parent.$index;
        var subtabIndex = $itemScope.$parent.$index;
        var pageType = $itemScope.$parent.subtab.pageType;
        $scope.removePage(pageType, tabIndex, subtabIndex);
      }
    },
    {
      text: 'Move Page Up',
      click: function ($itemScope) {
        var tabIndex = $itemScope.$parent.$parent.$parent.$index;
        var subtabIndex = $itemScope.$parent.$index;
        $scope.movePageUp(tabIndex, subtabIndex);
      }
    },
    {
      text: 'Move Page Down',
      click: function ($itemScope) {
        var tabIndex = $itemScope.$parent.$parent.$parent.$index;
        var subtabIndex = $itemScope.$parent.$index;
        $scope.movePageDown(tabIndex, subtabIndex);
      }
    }
  ];

  pageListService.getPageList().then(function(res) {
    $scope.tabs = angular.copy(res.data.pages);
    for (var tabIndex in $scope.tabs) {
      var tab = $scope.tabs[tabIndex];
      if ($scope.isDropdown(tab)) {
        for (var i in tab.subtabs) {
          var subtab = tab.subtabs[i];
          if (subtab.pageType !== 'election') {
            subtab.href = $scope.toKebabCase(subtab.title);
          }
        }
      }
      else {
        tab.href = $scope.toKebabCase(tab.title);
      }
    }
  });

  $scope.isActive = function(tab) {
    if (tab.href === $location.path())
      return true;
    if ($scope.isDropdown(tab)) {
      for (var i in tab.subtabs) {
        if (tab.subtabs[i].href === $location.path())
          return true;
      }
    }
    return false;
  };

  $scope.isDropdown = function(tab) {
    return tab.subtabs && tab.subtabs.length;
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

  $scope.removePage = function(pageType, tabIndex, subtabIndex) {
    if (pageType === 'election') {
      alert('You cannot remove election pages!');
    }
    else if (angular.isDefined(subtabIndex)) {
      $scope.tabs[tabIndex].subtabs.splice(subtabIndex, 1);
    }
    else {
      $scope.tabs.splice(tabIndex, 1);
    }
    // this.savePageList($scope.tabs);
  };

  $scope.movePageLeft = function(tabIndex) {
    var moveIndex = Math.max(0, tabIndex - 1);
    $scope.swap($scope.tabs, tabIndex, moveIndex);
  };

  $scope.movePageRight = function(tabIndex) {
    var moveIndex = Math.min($scope.tabs.length - 1, tabIndex + 1);
    $scope.swap($scope.tabs, tabIndex, moveIndex);
  };

  $scope.movePageUp = function(tabIndex, subtabIndex) {
    var subtab = $scope.tabs[tabIndex].subtabs;
    var moveIndex = Math.max(0, subtabIndex - 1);
    $scope.swap(subtab, subtabIndex, moveIndex);
  };

  $scope.movePageDown = function(tabIndex, subtabIndex) {
    var subtab = $scope.tabs[tabIndex].subtabs;
    var moveIndex = Math.min(subtab.length - 1, subtabIndex + 1);
    $scope.swap(subtab, subtabIndex, moveIndex);
  };

  $scope.toKebabCase = function(str) {
    return str.toLowerCase().split(' ').join('-');
  };

  $scope.swap = function(array, a, b) {
    var temp = array[a];
    array[a] = array[b];
    array[b] = temp;
  };
});
