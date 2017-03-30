app.controller('masterClassController', function($scope, $sce, $filter, authService, masterClassService) {
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

  $scope.format = 'MM/dd/yy h:mm a'
  $scope.dateOptions = {
    maxDate: new Date(2025, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };
  $scope.masterClass = {
    inEditMode: false,
    html: '',
    date: Date.now(),
    opened: false
  };
  $scope.tempMasterClass = {
    inEditMode: false,
    html: '',
    date: Date.now()
  };
  $scope.isMasterClassPast = function() {
    return Date.now() > Date.parse($scope.masterClass.date);
  };

  masterClassService.getMasterClass().then(function(res) {
    if (res.data) {
      $scope.masterClass.html = res.data.html;
      $scope.masterClass.date = res.data.date;
    } else {
      $scope.masterClass.html = 'Master Class Information goes here.';
    }
  });

  $scope.toggleOpened = function(masterClass) {
    masterClass.opened = !masterClass.opened;
  }

  $scope.isAdmin = function() {
    return authService.isAdmin();
  }

  $scope.editMasterClass = function() {
    $scope.tempMasterClass = angular.copy($scope.masterClass);
    $scope.masterClass.inEditMode = true;
  }

  $scope.saveMasterClass = function() {
    masterClassService.saveMasterClass($scope.masterClass);
    $scope.masterClass.html = angular.copy($scope.tempMasterClass.html);
    $scope.masterClass.inEditMode = false;
  }

  $scope.undoEdits = function() {
    $scope.tempMasterClass.html = angular.copy($scope.masterClass.html);
    $scope.masterClass.inEditMode = false;
  }

  $scope.trustAsHtml = function(string) {
    return $sce.trustAsHtml(string);
  };
});
