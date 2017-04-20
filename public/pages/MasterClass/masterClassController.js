app.controller('masterClassController', function(
    $scope,
    $sce,
    $filter,
    $uibModal,
    authService,
    dateService,
    masterClassService,
    surveyService,
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
      $scope.masterClass.survey = res.data.survey;
    }
    else {
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
    masterClassService.saveMasterClass($scope.masterClass);
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
      $scope.masterClass.survey = result;
      masterClassService.saveMasterClass($scope.masterClass);
    }, function() {}); // eslint-disable-line no-empty-function
  };

  $scope.openSurvey = function() {
    $uibModal.open($scope.modalOptions).result
      .then(function() {}, function() {}); // eslint-disable-line no-empty-function
  };
});
