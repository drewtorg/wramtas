app.directive('wraInformation', function(
  $sce,
  authService,
  informationPageService,
  TINY_MCE_OPTIONS) {
  return {
    restrict: 'E',
    templateUrl: 'pages/Shared/directives/information/information.html',
    scope: {
      page: '@'
    },
    controller: ['$scope', function($scope) {
      $scope.tinymceOptions = TINY_MCE_OPTIONS;
      $scope.informationPage = {
        inEditMode: false,
        html: '',
        pdfUrl: ''
      };
      $scope.tempInformationPage = {
        inEditMode: false,
        html: '',
        pdfUrl: ''
      };

      informationPageService.getInformationPage($scope.page)
        .then(function(res) {
        if (res.data) {
          $scope.informationPage.html = res.data.html;
          $scope.informationPage.pdfUrl = res.data.pdfUrl;
        }
        else
          $scope.informationPage.html = $scope.page + ' Information goes here.';
      });

      $scope.editInformationPage = function() {
        $scope.tempInformationPage = angular.copy($scope.informationPage);
        $scope.informationPage.inEditMode = true;
      };

      $scope.saveInformationPage = function() {
        informationPageService.updateInformationPage($scope.page,
                                                     $scope.informationPage);
        $scope.informationPage.html =
          angular.copy($scope.tempInformationPage.html);
        $scope.informationPage.pdfUrl =
          angular.copy($scope.tempInformationPage.pdfUrl);
        $scope.informationPage.inEditMode = false;
      };

      $scope.undoEdits = function() {
        $scope.tempInformationPage.html =
          angular.copy($scope.informationPage.html);
        $scope.tempInformationPage.pdfUrl =
          angular.copy($scope.informationPage.pdfUrl);
        $scope.informationPage.inEditMode = false;
      };

      $scope.trustAsHtml = function(string) {
        return $sce.trustAsHtml(string);
      };

      $scope.isAdmin = function() {
        return authService.isAdmin();
      };

      $scope.attachPdf = function(file) {
        $scope.tempInformationPage.pdfUrl = file.url;
      };
    }]
  };
});
