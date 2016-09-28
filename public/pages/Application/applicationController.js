app.controller('applicationController', function($scope, $routeParams, applicationService, universitiesService, positionsService) {
  $scope.form = {};
  $scope.universities = {};
  $scope.positions = {};
  $scope.showNotice = false;
  $scope.submitNotice = 'Thank for for submitting your application! The WRAMTAS Executive Board will review all applications on March 13th, 2017 to make sure it contains accurate and appropriate information.  Come back to http://wramtas.org/ after that date to see all the accepted applications.';
  $scope.saveNotice = 'You have saved your application, but it is not yet submitted.  When you are ready, submit your application for final review by hitting the "Submit Application" button.';
  $scope.errorNotice = 'Your application could not be found.  Please check that you have used the correct link.  If this doesn\'t work, nominate yourself and try the new application sent to you.';
  $scope.application = {};
  applicationService.getApplication($routeParams._id).then(function(response) {
    if (response.data && !response.data.submitted)
      $scope.application = response.data;
    else
      $scope.popupNotice($scope.errorNotice);
  })

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

  $scope.popupNotice = function(notice) {
    $scope.showNotice = true;
    $scope.notice = notice;
  };

  $scope.submitApplication = function(form) {
    applicationService.submitApplication(form);
    $scope.popupNotice($scope.submitNotice);
  };

  $scope.saveApplication = function(form) {
    applicationService.saveApplication(form);
    $scope.popupNotice($scope.saveNotice);
  };
});
