app.directive('wraScholarshipList', function(
    $sce,
    authService,
    scholarshipsService) {
  return {
    restrict: 'E',
    templateUrl: 'pages/Scholarships/scholarshipList/scholarshipList.html',
    controller: ['$scope', function($scope) {
      scholarshipsService.getScholarships().then(function(response) {
        $scope.scholarshipApps = response.data;
      });

      $scope.isAdmin = function() {
        return authService.isAdmin();
      };

      $scope.addScholarshipApp = function() {
        var newApp = {
          prompt: '',
          inEditMode: true,
        };
        scholarshipsService.createScholarship().then(function(response) {
          newApp._id = response.data._id;
          $scope.scholarshipApps.push(newApp);
        });
      };
    }]
  };
});
