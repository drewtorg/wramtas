app.controller('scholarshipsController', function(
    $scope,
    $sce,
    authService,
    scholarshipPageService,
    TINY_MCE_OPTIONS) {
  $scope.message = '';
  $scope.scholarship = {};

  $scope.tinymceOptions = TINY_MCE_OPTIONS;
  $scope.scholarshipInfo = {
    inEditMode: false,
    html: ''
  };
  $scope.tempScholarshipInfo = {
    inEditMode: false,
    html: ''
  };

  scholarshipPageService.getScholarshipPage().then(function(res) {
    if (res.data)
      $scope.scholarshipInfo.html = res.data.html;
    else
      $scope.scholarshipInfo.html = 'Scholarship Information goes here.';
  });

  $scope.editScholarshipInfo = function() {
    $scope.tempScholarshipInfo = angular.copy($scope.scholarshipInfo);
    $scope.scholarshipInfo.inEditMode = true;
  };

  $scope.saveScholarshipInfo = function() {
    scholarshipPageService.updateScholarshipPage($scope.scholarshipInfo);
    $scope.scholarshipInfo.html = angular.copy($scope.tempScholarshipInfo.html);
    $scope.scholarshipInfo.inEditMode = false;
  };

  $scope.undoEdits = function() {
    $scope.tempScholarshipInfo.html = angular.copy($scope.scholarshipInfo.html);
    $scope.scholarshipInfo.inEditMode = false;
  };

  $scope.trustAsHtml = function(string) {
    return $sce.trustAsHtml(string);
  };

  $scope.isAdmin = function() {
    return authService.isAdmin();
  };
});
