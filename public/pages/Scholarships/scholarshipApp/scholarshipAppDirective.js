app.directive('scholarshipApp', function($sce, authService, scholarshipsService) {
  return {
    restrict: 'E',
    templateUrl: '/pages/Scholarships/scholarshipApp/scholarshipApp.html',
    scope: {
      scholarship: '=',
      // onDelete: '&'
    },
    compile: function(tElem, tAttrs) {
      return {
        pre: function(scope, iElem, iAttrs) {
          scope.tinymceOptions = {
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
        },
        post: function(scope, iElem, iAttrs) {
          scope.uploader = {};
          scope.scholarship.inEditMode = angular.isDefined(scope.scholarship.inEditMode) ? scope.scholarship.inEditMode : false;

          scope.isAdmin = function() {
            return authService.isAdmin();
          };

          // scope.onFileUploadSuccess = function($message) {
          //   var res = JSON.parse($message);
          //   scope.scholarship.upload = angular.copy('scholarship-apps/' + res.filename);

          //   scholarshipsService.uploadApplication(scope.scholarship).then(function(response) {
          //     scope.toggleEditMode();
          //   });
          // };

          scope.toggleEditMode = function() {
            scope.scholarship.inEditMode = !scope.scholarship.inEditMode;
          };

          scope.editScholarship = function() {
            scope.toggleEditMode();
            scope.tempScholarship = angular.copy(scope.scholarship);
          };

          scope.deleteScholarship = function() {
            // scope.onDelete();
            scholarshipsService.deleteScholarship(scope.scholarship);
          };

          scope.saveScholarship = function() {
            if (angular.isDefined(scope.tempScholarship)) {
              scope.scholarship.prompt = angular.copy(scope.tempScholarship.prompt);
              // if (scope.uploader.flow.files.length)
              //   scope.uploader.flow.upload();
              scholarshipsService.saveScholarship(scope.scholarship).then(function(response) {
                scope.toggleEditMode();
              });
            }
          };

          scope.undoEdits = function() {
            // scope.uploader.flow.cancel();

            // this is the case when we are undoing after clicking edit
            if (angular.isDefined(scope.tempScholarship))
              scope.tempScholarship = angular.copy(scope.scholarship);

            // this is the case when we are undoing after clicking add
            if (!angular.isDefined(scope.tempScholarship) || scope.tempScholarship.prompt === '')
              scope.deleteScholarship();

            scope.toggleEditMode();
          };
        }
      }
    }
  }
});
