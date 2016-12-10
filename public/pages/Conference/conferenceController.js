app.controller('conferenceController', function($scope, $sce, authService, conferencePageService) {
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
  $scope.conferenceInfo = {
    inEditMode: false,
    html: ''
  };
  $scope.tempConferenceInfo = {
    inEditMode: false,
    html: ''
  };

  conferencePageService.getConferencePage().then(function(res) {
    if (res.data)
      $scope.conferenceInfo.html = res.data.html;
    else
      $scope.conferenceInfo.html = 'Conference Information goes here.';
  });

  $scope.editConferenceInfo = function() {
    $scope.tempConferenceInfo = angular.copy($scope.conferenceInfo);
    $scope.conferenceInfo.inEditMode = true;
  }

  $scope.saveConferenceInfo = function() {
    conferencePageService.updateConferencePage($scope.conferenceInfo);
    $scope.conferenceInfo.html = angular.copy($scope.tempConferenceInfo.html);
    $scope.conferenceInfo.inEditMode = false;
  }

  $scope.undoEdits = function() {
    $scope.tempConferenceInfo.html = angular.copy($scope.conferenceInfo.html);
    $scope.conferenceInfo.inEditMode = false;
  }

  $scope.trustAsHtml = function(string) {
    return $sce.trustAsHtml(string);
  }

  $scope.isAdmin = function() {
    return authService.isAdmin();
  }
});
