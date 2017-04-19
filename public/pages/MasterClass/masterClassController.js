app.controller('masterClassController', function(
    $scope,
    $sce,
    $filter,
    $uibModal,
    authService,
    dateService,
    masterClassService,
    DATE_OPTIONS,
    TINY_MCE_OPTIONS) {
  $scope.tinymceOptions = TINY_MCE_OPTIONS;
  $scope.format = DATE_OPTIONS.format;
  $scope.datepickerOptions = DATE_OPTIONS.datepickerOptions;
  $scope.modalOptions = {
    controller: 'SurveyController',
    templateUrl: 'pages/MasterClass/survey/survey.html'
  };
  $scope.masterClass = {
    inEditMode: false,
    html: '',
    dates: dateService.newUIDates(['openDate', 'closeDate'])
  };
  $scope.tempMasterClass = {
    inEditMode: false,
    html: '',
    dates: dateService.newUIDates(['openDate', 'closeDate'])
  };

  $scope.masterClassOver = function() {
    return Date.now() > $scope.masterClass.dates.closeDate.date;
  };

  $scope.masterClassComing = function() {
    return Date.now() < $scope.masterClass.dates.openDate.date;
  };

  $scope.masterClassInProgress = function() {
    return Date.now() > $scope.masterClass.dates.openDate.date &&
             !$scope.masterClassOver();
  };

  $scope.displayMasterClass = function() {
    return $scope.master() && !$scope.isMasterClassPast();
  };

  masterClassService.getMasterClass().then(function(res) {
    if (res.data) {
      $scope.masterClass.html = res.data.html;
      $scope.masterClass.dates = dateService.toUIDateFormat(res.data.dates);
    } else {
      $scope.masterClass.html = 'No Master Class data could be found.';
    }
  });

  $scope.toggleOpened = function(date) {
    dateService.toggleOpened(date);
  };

  $scope.isAdmin = function() {
    return authService.isAdmin();
  };

  $scope.editMasterClass = function() {
    $scope.tempMasterClass = angular.copy($scope.masterClass);
    $scope.masterClass.inEditMode = true;
  };

  $scope.saveMasterClass = function() {
    $scope.masterClass = angular.copy($scope.tempMasterClass);
    var backendFormat = angular.copy($scope.masterClass);
    backendFormat.dates = dateService.toBackendDateFormat(backendFormat.dates);
    masterClassService.saveMasterClass(backendFormat);
    $scope.masterClass.inEditMode = false;
  };

  $scope.undoEdits = function() {
    $scope.tempMasterClass = angular.copy($scope.masterClass);
    $scope.masterClass.inEditMode = false;
  };

  $scope.trustAsHtml = function(string) {
    return $sce.trustAsHtml(string);
  };

  $scope.editSurvey = function() {
    var modalInstance = $uibModal.open($scope.modalOptions);
    modalInstance.result.then(function (result) {
      console.log('Success!');
      console.log(result);
    }, function (reason) {
      console.log('Failure...')
      console.log(reason);
    });
  };

  $scope.openSurvey = function() {
    var modalInstance = $uibModal.open($scope.modalOptions);
    modalInstance.result.then(function (result) {
      console.log('Success!');
      console.log(result);
    }, function (reason) {
      console.log('Failure...')
      console.log(reason);
    });
  };
});
