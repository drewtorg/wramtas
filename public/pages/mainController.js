app.controller('mainController', function(
    $scope,
    $location,
    $http,
    $cookies,
    $uibModal,
    authService,
    aboutPageService,
    changeCaseService,
    informationPageService,
    pageListService,
    postsService,
    submissionsService,
    videoPageService) {
  $scope.tabs = {};
  $scope.editingTabs = false;

  $scope.form = {
    username: '',
    password: ''
  };

  $scope.tabOptions = [
    {
      text: 'Add Page',
      click: function($itemScope) {
        $scope.onTabContextMenu($itemScope, 'add');
      }
    },
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
            subtab.href = subtab.pageType + '/' + changeCaseService.toKebabCase(subtab.title);
          }
        }
      }
      else {
        tab.href = tab.pageType + '/' + changeCaseService.toKebabCase(tab.title);
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

    pageListService.savePageList($scope.tabs);
  };

  $scope.addPage = function(tab, subtab) {
    var modalOptions = {
      controller: 'AddPageController',
      templateUrl: 'pages/Shared/modals/addPage/addPage.html',
      backdrop: 'static',
      keyboard: false,
      size: 'sm'
    };
    var modalInstance = $uibModal.open(modalOptions);
    modalInstance.result.then(function (result) {
      result.href = result.pageType + '/' +
        changeCaseService.toKebabCase(result.title);
      if (angular.isDefined(tab) && angular.isDefined(subtab)) {
        $scope.tabs[tab.$index].subtabs.splice(subtab.$index, 0, result);
      }
      else {
        $scope.tabs.push(result);
      }
      $scope.addPageBackend(result.pageType, result.title);
      pageListService.savePageList($scope.tabs);
    }, function() {}); // eslint-disable-line no-empty-function
  };

  $scope.removePage = function(tab, subtab) {
    if (tab.tab.pageType === 'about' || tab.tab.pageType === 'election' || subtab && subtab.subtab.pageType === 'election') {
      alert('You cannot remove this page!');
      return;
    }

    var modalOptions = {
      controller: 'ConfirmController',
      templateUrl: 'pages/Shared/modals/confirm/confirm.html',
      backdrop: 'static',
      keyboard: false,
      size: 'sm',
      resolve: {
        message: function() {
          return 'Are you sure you want to delete this page?';
        }
      }
    };
    var modalInstance = $uibModal.open(modalOptions);
    modalInstance.result.then(function () {
      var pageType = tab.tab.pageType;
      var title = tab.tab.title;
      var tabs = $scope.tabs[tab.$index];
      if (angular.isDefined(subtab)) {
        pageType = tabs.subtabs.pageType;
        title = tabs.subtabs.title;
        tabs.subtabs.splice(subtab.$index, 1);
        $scope.removePageBackend(pageType, title);
      }
      else {
        $scope.tabs.splice(tab.$index, 1);
        $scope.removePageBackend(pageType, title, tabs.subtabs);
      }
      pageListService.savePageList($scope.tabs);
    }, function() { }); // eslint-disable-line no-empty-function
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

  $scope.swap = function(array, a, b) {
    var temp = array[a];
    array[a] = array[b];
    array[b] = temp;
  };

  $scope.getPageLink = function(tab) {
    var href = tab.href;
    if (tab.pageType !== 'election')
      href = tab.pageType + '/' + href;
    return href;
  };

  $scope.addPageBackend = function(pageType, title) {
    if (pageType === 'blog') {
      postsService.createPost(title);
    }
    else if (pageType === 'information') {
      informationPageService.updateInformationPage(title, {
        page: changeCaseService.toTitleCase(title)
      });
    }
    else if (pageType === 'submission') {
      submissionsService.createSubmissionPage({
        page: changeCaseService.toTitleCase(title)
      });
    }
    else if (pageType === 'video') {
      videoPageService.saveVideoPage(title, {
        page: changeCaseService.toTitleCase(title)
      });
    }
  };

  $scope.removePageBackend = function(pageType, title, subtabs) {
    if (pageType === 'blog') {
      postsService.deletePosts(title);
    }
    else if (pageType === 'information') {
      informationPageService.deleteInformationPage(
        changeCaseService.toTitleCase(title));
    }
    else if (pageType === 'submission') {
      submissionsService.deleteSubmissionPage(
        changeCaseService.toTitleCase(title));
    }
    else if (pageType === 'video') {
      videoPageService.deleteVideoPage(changeCaseService.toTitleCase(title));
    }
    else if (pageType === 'placeholder') {
      for (var i = 0; i < subtabs.length; i += 1)
        $scope.removePageBackend(subtabs[i].pageType, subtabs[i].title);
    }
  };
});
