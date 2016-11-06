app.controller('applicationController', function($scope, $routeParams, applicationService, universitiesService, positionsService) {
  $scope.form = {};
  $scope.universities = {};
  $scope.positions = {};
  $scope.showNotice = false;
  $scope.submitNotice = 'Thank for for submitting your application! The WRAMTAS Executive Board will review all applications on March 13th, 2017 to make sure it contains accurate and appropriate information. Come back to wramtas.org/applications after that date to see all the accepted applications.';
  $scope.saveNotice = 'You have saved your application, but it is not yet submitted.  When you are ready, submit your application for final review by hitting the "Submit Application" button.';
  $scope.submittedNotice = 'Your application has already been submitted.  You will be notified if your application needs to be modified and re-submitted.';
  $scope.errorNotice = 'Your application could not be found.  Please check that you have used the correct link.  If this doesn\'t work, nominate yourself and try the new application sent to you.';
  $scope.application = {};
  $scope.validApplication = false;
  applicationService.getApplication($routeParams._id).then(function(response) {
    if (!response.data)
      $scope.popupNotice($scope.errorNotice);
    else if (response.data.submitted)
      $scope.popupNotice($scope.submittedNotice);
    else {
      $scope.application = response.data;
      $scope.validApplication = true;

      universitiesService.getUniversities().then(function(response) {
        $scope.universities = response.data;
        for (var i = 0; i < $scope.universities.length; i += 1) {
          $scope.universities[i].id = i + 1;
          if ($scope.application.university === $scope.universities[i]._id) {
            $scope.application.university = $scope.universities[i];
          }
        }
        if (!$scope.form.university)
          $scope.form.university = $scope.universities[0];
      });

      positionsService.getPositions().then(function(response) {
        $scope.positions = response.data;
        for (var i = 0; i < $scope.positions.length; i += 1) {
          $scope.positions[i].id = i + 1;
          if ($scope.application.position === $scope.positions[i]._id) {
            $scope.application.position = $scope.positions[i];
          }
        }
        if (!$scope.form.position)
          $scope.form.position = $scope.positions[0];
      });
    }
  });

  $scope.isValidApplication = function() {
    return $scope.validApplication;
  }

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
