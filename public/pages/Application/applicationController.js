app.controller('applicationController', function($scope, $routeParams, $anchorScroll, applicationService, universitiesService, positionsService) {
  $scope.form = {};
  $scope.universities = {};
  $scope.positions = {};
  $scope.showNotice = false;
  $scope.submitNotice = 'Thank for for submitting your application! The WRAMTAS Executive Board will review all applications on March 13th, 2017 to make sure it contains accurate and appropriate information. Come back to wramtas.org/applications after that date to see all the accepted applications.';
  $scope.saveNotice = 'You have saved your application, but it is not yet submitted.  When you are ready, submit your application for final review by hitting the "Submit Application" button.';
  $scope.submittedNotice = 'Your application has already been submitted.  You will be notified if your application needs to be modified and re-submitted.';
  $scope.errorNotice = 'Your application could not be found.  Please check that you have used the correct link.  If this doesn\'t work, nominate yourself and try the new application sent to you.';
  $scope.application = {};
  $scope.showApplication = false;
  $scope.tinymceOptions = {
    selector: 'textarea',
    theme: 'modern',
    plugins: [
      'advlist autolink link image imagetools lists charmap preview hr anchor pagebreak spellchecker',
      'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
      'save table contextmenu directionality template paste textcolor'
    ],
    height: 400,
    toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media fullpage | forecolor',
    imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
    style_formats_merge: true,
    style_formats: [{
      title: 'Images',
      items: [{
        title: 'Float Left',
        selector: 'img',
        styles: {
          'float': 'left',
          'margin': '0 10px 0 10px'
        }
      }, {
        title: 'Float Right',
        selector: 'img',
        styles: {
          'float': 'right',
          'margin': '0 10px 0 10px'
        }
      }, {
        title: 'Shadow Box',
        selector: 'img',
        styles: {
          'box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2)'
        }
      }]
    }]
  };
  applicationService.getApplication($routeParams._id).then(function(response) {
    if (!response.data)
      $scope.popupNotice($scope.errorNotice);
    else if (response.data.submitted)
      $scope.popupNotice($scope.submittedNotice);
    else {
      $scope.application = response.data;
      $scope.showApplication = true;

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

  $scope.popupNotice = function(notice) {
    $scope.showNotice = true;
    $scope.notice = notice;
  };

  $scope.submitApplication = function(form) {
    applicationService.submitApplication(form);
    $scope.showApplication = false;
    $scope.popupNotice($scope.submitNotice);
    $anchorScroll();
  };

  $scope.saveApplication = function(form) {
    applicationService.saveApplication(form);
    $scope.popupNotice($scope.saveNotice);
    $anchorScroll();
  };
});
