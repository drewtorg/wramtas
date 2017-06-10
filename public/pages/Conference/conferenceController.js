app.controller('conferenceController', function(
    $scope,
    $sce,
    authService,
    conferencePageService,
    TINY_MCE_OPTIONS) {
  $scope.tinymceOptions = TINY_MCE_OPTIONS;
  $scope.conferenceInfo = {
    inEditMode: false,
    html: '',
    pdfUrl: ''
  };
  $scope.tempConferenceInfo = {
    inEditMode: false,
    html: '',
    pdfUrl: ''
  };

  conferencePageService.getConferencePage().then(function(res) {
    if (res.data) {
      $scope.conferenceInfo.html = res.data.html;
      $scope.conferenceInfo.pdfUrl = res.data.pdfUrl;
    }
    else
      $scope.conferenceInfo.html = 'Conference Information goes here.';
  });

  $scope.editConferenceInfo = function() {
    $scope.tempConferenceInfo = angular.copy($scope.conferenceInfo);
    $scope.conferenceInfo.inEditMode = true;
  };

  $scope.saveConferenceInfo = function() {
    conferencePageService.updateConferencePage($scope.conferenceInfo);
    $scope.conferenceInfo.html = angular.copy($scope.tempConferenceInfo.html);
    $scope.conferenceInfo.pdfUrl =
      angular.copy($scope.tempConferenceInfo.pdfUrl);
    $scope.conferenceInfo.inEditMode = false;
  };

  $scope.undoEdits = function() {
    $scope.tempConferenceInfo.html = angular.copy($scope.conferenceInfo.html);
    $scope.tempConferenceInfo.pdfUrl =
      angular.copy($scope.conferenceInfo.pdfUrl);
    $scope.conferenceInfo.inEditMode = false;
  };

  $scope.trustAsHtml = function(string) {
    return $sce.trustAsHtml(string);
  };

  $scope.isAdmin = function() {
    return authService.isAdmin();
  };

  $scope.attachPdf = function(file) {
    $scope.tempConferenceInfo.pdfUrl = file.url;
  };
});
