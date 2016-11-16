app.directive('scholarshipApp', function($sce, authService, scholarshipsService) {
  return {
    restrict: 'E',
    templateUrl: '/pages/Scholarships/scholarshipApp/scholarshipApp.html',
    scope: {
      application: '=',
      onDelete: '&'
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
          scope.application.inEditMode = angular.isDefined(scope.application.inEditMode) ? scope.application.inEditMode : false;

          scope.isAdmin = function() {
            return authService.isAdmin();
          };

          scope.onFileUploadSuccess = function($message) {
            var res = JSON.parse($message);
            scope.application.upload = angular.copy('uploads/' + res.filename);

            scholarshipsService.uploadApplication(scope.application).then(function(response) {
              scope.toggleEditMode();
            });
          };

          scope.toggleEditMode = function() {
            scope.application.inEditMode = !scope.application.inEditMode;
          };

          scope.editScholarship = function() {
            scope.toggleEditMode();
            scope.tempScholarship = angular.copy(scope.application);
          };

          scope.deleteScholarship = function() {
            scope.onDelete();
            scholarshipsService.deleteScholarship(scope.application);
          };

          scope.savescholarship = function() {
            // if (angular.isDefined(scope.tempBio)) {
            //   scope.bio.about = angular.copy(scope.tempBio.about);
            //   scope.bio.name = angular.copy(scope.tempBio.name);
            //   scope.bio.title = angular.copy(scope.tempBio.title);
            //   scope.bio.email = angular.copy(scope.tempBio.email);
            //   if (scope.uploader.flow.files.length)
            //     scope.uploader.flow.upload();
            //   else
            //     biosService.saveBio(scope.type, scope.bio).then(function(response) {
            //       scope.toggleEditMode();
            //     });
            // }
          };

          // scope.undoBio = function() {
          //   scope.uploader.flow.cancel();

          //   // this is the case when we are undoing after clicking edit
          //   if (angular.isDefined(scope.tempBio))
          //     scope.tempBio = angular.copy(scope.bio);

          //   // this is the case when we are undoing after clicking add
          //   if (!angular.isDefined(scope.tempBio))
          //     scope.deleteBio();

          //   scope.toggleEditMode();
          // };
        }
      }
    }
  }
});
