app.controller('masterClassController', function(
    $scope,
    $sce,
    $filter,
    authService,
    masterClassService,
    TINY_MCE_OPTIONS) {
  $scope.tinymceOptions = TINY_MCE_OPTIONS;

  $scope.format = 'MM/dd/yy h:mm a';
  $scope.dateOptions = {
    maxDate: new Date(2025, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };
  $scope.masterClass = {
    inEditMode: false,
    html: ''
  };
  $scope.openDate = {
    date: Date.now(),
    opened: false
  };
  $scope.closeDate = {
    date: Date.now(),
    opened: false
  };
  $scope.tempMasterClass = {
    inEditMode: false,
    html: '',
    date: Date.now()
  };

  $scope.isMasterClassPast = function() {
    return Date.now() > Date.parse($scope.closeDate.date);
  };

  $scope.isMasterClassPlanned = function() {
    return Date.now() < Date.parse($scope.openDate.date);
  };

  masterClassService.getMasterClass().then(function(res) {
    if (res.data) {
      $scope.masterClass.html = res.data.html;
      $scope.openDate.date = res.data.openDate;
      $scope.closeDate.date = res.data.closeDate;
    } else {
      $scope.masterClass.html = 'No Master Class data could be found.';
    }
  });

  $scope.toggleOpened = function(date) {
    date.opened = !date.opened;
  };

  $scope.isAdmin = function() {
    return authService.isAdmin();
  };

  $scope.editMasterClass = function() {
    $scope.tempMasterClass = angular.copy($scope.masterClass);
    $scope.masterClass.inEditMode = true;
  };

  $scope.saveMasterClass = function() {
    masterClassService.saveMasterClass($scope.masterClass);
    $scope.masterClass.html = angular.copy($scope.tempMasterClass.html);
    $scope.masterClass.inEditMode = false;
  };

  $scope.undoEdits = function() {
    $scope.tempMasterClass.html = angular.copy($scope.masterClass.html);
    $scope.masterClass.inEditMode = false;
  };

  $scope.trustAsHtml = function(string) {
    return $sce.trustAsHtml(string);
  };
});
