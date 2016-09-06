// Something about this controller causes things to not load at all for some reason.  Will look into later.
app.controller('applicationController', function($scope, applicationService, universitiesService, positionsService) {
  $scope.form = {};
  $scope.universities = {};
  $scope.positions = {};
  $scope.showDisclaimer = false;
  $scope.disclaimer = 'Thank for for submitting your application!\
                      The WRAMTAS Executive Board will review all applications \
                      on March 13th, 2017 to make sure it contains accurate and \
                      appropriate information.  Come back to http://wramsat.org/ \
                      after that date to see all the accepted applications.';

  // TODO: Check if this is a valid application.  If not, either redirect to the
  // home page or show an error message stating that this application doesn't exist.

  universitiesService.getUniversities().then(function(response) {
    $scope.universities = response.data;
    for (var i = 1; i <= $scope.universities.length; i += 1)
      $scope.universities[i - 1].id = i;
    $scope.form.university = $scope.universities[0];
  });

  positionsService.getPositions().then(function(response) {
    $scope.positions = response.data;
    for (var i = 1; i <= $scope.positions.length; i += 1)
      $scope.positions[i - 1].id = i;
    $scope.form.position = $scope.positions[0];
  });

  $scope.popupNotice = function() {
    $scope.showDisclaimer = true;
  };

  $scope.submitApplication = function(form) {
    applicationService.submitApplication(form);
    $scope.popupNotice();
  };
});
