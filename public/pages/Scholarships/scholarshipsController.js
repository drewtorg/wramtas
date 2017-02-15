app.controller('scholarshipsController', function($scope, $sce, authService, scholarshipPageService) {
  $scope.message = '';
  $scope.scholarship = {};

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
  }

  $scope.saveScholarshipInfo = function() {
    scholarshipPageService.updateScholarshipPage($scope.scholarshipInfo);
    $scope.scholarshipInfo.html = angular.copy($scope.tempScholarshipInfo.html);
    $scope.scholarshipInfo.inEditMode = false;
  }

  $scope.undoEdits = function() {
    $scope.tempScholarshipInfo.html = angular.copy($scope.scholarshipInfo.html);
    $scope.scholarshipInfo.inEditMode = false;
  }

  $scope.trustAsHtml = function(string) {
    return $sce.trustAsHtml(string);
  }

  $scope.isAdmin = function() {
    return authService.isAdmin();
  }
});
