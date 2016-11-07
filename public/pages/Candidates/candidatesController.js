app.controller('candidatesController', function($scope, applicationService) {
  $scope.candidates = {};

  applicationService.getApplications().then(function(response) {
    $scope.candidates = response.data;
  });
});
