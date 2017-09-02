app.directive('wraAbout', function(
  $sce,
  $location,
  authService,
  aboutPageService) {
  return {
    restrict: 'E',
    templateUrl: 'pages/About/about/about.html',
    scope: {
      page: '@'
    },
    controller: ['$scope', function($scope) {
      $scope.pageInfo = {
        descripton: '',
        contactEmail: '',
        boardImage: '',
        inEditMode: false
      };
      $scope.tempPageInfo = {
        descripton: '',
        contactEmail: '',
        boardImage: '',
        inEditMode: false
      };

      $scope.pageInfo.description = 'Description of the WRAMTAS organization goes here.';
      $scope.pageInfo.contactEmail = 'default@gmail.com';

      aboutPageService.getAboutPage($scope.page).then(function(res) {
        if (res.data)
          $scope.pageInfo = res.data;
        else {
          $location.path('/');
        }
      });

      $scope.updateAboutPage = function() {
        $scope.pageInfo = angular.copy($scope.tempPageInfo);
        $scope.pageInfo.inEditMode = false;
        aboutPageService.updateAboutPage($scope.page, $scope.pageInfo).then(function() {
          $scope.pageInfo.inEditMode = false;
        });
      };

      $scope.editAboutPage = function() {
        $scope.tempPageInfo = angular.copy($scope.pageInfo);
        $scope.pageInfo.inEditMode = true;
      };

      $scope.undoEdits = function() {
        $scope.tempElectionInfo = angular.copy($scope.electionInfo);
        $scope.pageInfo.inEditMode = false;
      };

      $scope.trustAsHtml = function(html) {
        return $sce.trustAsHtml(html);
      };

      $scope.isAdmin = function() {
        return authService.isAdmin();
      };

      $scope.onSuccess = function(blob) {
        $scope.tempPageInfo.boardImage = blob.url;
      };
    }]
  };
});
