app.controller('mainController', function(
    $scope,
    $location,
    $http,
    $cookies,
    $uibModal,
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
        $scope.onTabContextMenu($itemScope, 'remove');
      }
    },
    {
      text: 'Move Page Left',
      click: function ($itemScope) {
        $scope.onTabContextMenu($itemScope, 'left');
      }
    },
    {
      text: 'Move Page Right',
      click: function ($itemScope) {
        $scope.onTabContextMenu($itemScope, 'right');
      }
    }
  ];

  $scope.subtabOptions = [
    {
      text: 'Add Page',
      click: function($itemScope) {
        $scope.onSubtabContextMenu($itemScope, 'add');
      }
    },
    {
      text: 'Remove Page',
      click: function ($itemScope) {
        $scope.onSubtabContextMenu($itemScope, 'remove');
      }
    },
    {
      text: 'Move Page Up',
      click: function ($itemScope) {
        $scope.onSubtabContextMenu($itemScope, 'left');
      }
    },
    {
      text: 'Move Page Down',
      click: function ($itemScope) {
        $scope.onSubtabContextMenu($itemScope, 'right');
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

  $scope.onSubtabContextMenu = function($itemScope, action) {
    var tab = $itemScope.$parent.$parent.$parent;
    var subtab = $itemScope.$parent;
    $scope.executeAction(action, tab, subtab);
  };

  $scope.onTabContextMenu = function($itemScope, action) {
    var tab = $itemScope.$parent;
    $scope.executeAction(action, tab);
  };

  $scope.executeAction = function(action, tab, subtab) {
    if (action === 'left') $scope.movePageLeft(tab, subtab);
    else if (action === 'right') $scope.movePageRight(tab, subtab);
    else if (action === 'remove') $scope.removePage(tab, subtab);
    else if (action === 'add') $scope.addPage(tab, subtab);

    // pageListService.savePageList($scope.tabs);
  };

  $scope.addPage = function(tab, subtab) {
    var modalOptions = {
      controller: 'AddPageController',
      templateUrl: 'pages/addPageModal/addPage.html',
      backdrop: 'static',
      keyboard: false
    };
    var modalInstance = $uibModal.open(modalOptions);
    modalInstance.result.then(function (result) {
      
    }, function() {}); // eslint-disable-line no-empty-function
  };

  $scope.removePage = function(tab, subtab) {
    if (tab.tab.pageType === 'election' || subtab && subtab.subtab.pageType === 'election') {
      alert('You cannot remove election pages!');
    }
    else if (angular.isDefined(subtab)) {
      $scope.tabs[tab.$index].subtabs.splice(subtab.$index, 1);
    }
    else {
      $scope.tabs.splice(tab.$index, 1);
    }
  };

  $scope.movePageLeft = function(tab, subtab) {
    var moveIndex = 0;
    if (angular.isDefined(subtab)) {
      moveIndex = Math.max(0, subtab.$index - 1);
      $scope.swap($scope.tabs[tab.$index].subtabs, subtab.$index, moveIndex);
    }
    else {
      moveIndex = Math.max(0, tab.$index - 1);
      $scope.swap($scope.tabs, tab.$index, moveIndex);
    }
  };

  $scope.movePageRight = function(tab, subtab) {
    var moveIndex = 0;
    if (angular.isDefined(subtab)) {
      var subtabs = $scope.tabs[tab.$index].subtabs;
      moveIndex = Math.min(subtabs.length - 1, subtab.$index + 1);
      $scope.swap(subtabs, subtab.$index, moveIndex);
    }
    else {
      moveIndex = Math.min($scope.tabs.length - 1, tab.$index + 1);
      $scope.swap($scope.tabs, tab.$index, moveIndex);
    }
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
