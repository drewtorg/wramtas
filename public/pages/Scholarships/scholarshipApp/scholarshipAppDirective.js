app.directive('scholarshipApp', function($sce, authService, filepickerService, scholarshipsService) {
  return {
    restrict: 'E',
    templateUrl: '/pages/Scholarships/scholarshipApp/scholarshipApp.html',
    scope: {
      scholarship: '=',
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
          scope.scholarship.inEditMode = angular.isDefined(scope.scholarship.inEditMode) ? scope.scholarship.inEditMode : false;
          scope.showApp = false;
          scope.app = {
            name: '',
            amtaId: '',
            email: '',
            submissionPaths: []
          };
          scope.showContact = new Array(scope.scholarship.submissions.length).fill(false);
          scope.files = [];
          scope.showSavedMessage = false;
          scope.dates = {
            openDate: {
              date: Date.parse(scope.scholarship.openDate),
              opened: false
            },
            closeDate: {
              date: Date.parse(scope.scholarship.closeDate),
              opened: false
            }
          };
          scope.isScholarshipOpen = Date.now() > scope.dates.openDate.date && Date.now() < scope.dates.closeDate.date;
          scope.format = 'MM/dd/yy h:mm a'
          scope.dateOptions = {
            maxDate: new Date(2025, 5, 22),
            minDate: new Date(),
            startingDay: 1
          };

          scope.isAdmin = function() {
            return authService.isAdmin();
          };

          scope.trustAsHtml = function(string) {
            return $sce.trustAsHtml(string);
          };

          scope.toggleEditMode = function() {
            scope.scholarship.inEditMode = !scope.scholarship.inEditMode;
          };

          scope.toggleShowApp = function() {
            scope.showApp = !scope.showApp;
            if (scope.showSavedMessage) scope.showSavedMessage = false;
          };

          scope.toggleShowSaved = function() {
            scope.showSavedMessage = !scope.showSavedMessage;
          };

          scope.editScholarship = function() {
            scope.toggleEditMode();
            scope.tempScholarship = angular.copy(scope.scholarship);
          };

          scope.deleteScholarship = function() {
            scope.onDelete();
            scholarshipsService.deleteScholarship(scope.scholarship);
          };

          scope.saveScholarship = function() {
            if (angular.isDefined(scope.tempScholarship)) {
              scope.scholarship.prompt = angular.copy(scope.tempScholarship.prompt);
              scope.scholarship.numUploads = angular.copy(scope.tempScholarship.numUploads);
              scope.scholarship.openDate = angular.copy(scope.dates.openDate.date);
              scope.scholarship.closeDate = angular.copy(scope.dates.closeDate.date);
              scope.isScholarshipOpen = Date.now() > scope.dates.openDate.date && Date.now() < scope.dates.closeDate.date;

              scholarshipsService.saveScholarship(scope.scholarship).then(function(response) {});
              scope.toggleEditMode();
            }
          };

          scope.undoEdits = function() {
            // this is the case when we are undoing after clicking edit
            if (angular.isDefined(scope.tempScholarship)) {
              scope.tempScholarship = angular.copy(scope.scholarship);
              scope.dates.openDate.date = Date.parse(scope.scholarship.openDate);
              scope.dates.closeDate.date = Date.parse(scope.scholarship.closeDate);
            }

            // this is the case when we are undoing after clicking add
            if (!angular.isDefined(scope.tempScholarship) || scope.tempScholarship.prompt === '')
              scope.deleteScholarship();

            scope.toggleEditMode();
          };

          scope.submitScholarshipApp = function() {
            scholarshipsService.uploadScholarshipApplication(scope.scholarship._id, scope.app);
            scope.showContact.push(false);
            scope.toggleShowApp();
            scope.toggleShowSaved();
          }

          scope.toggleContactInfo = function(index) {
            scope.showContact[index] = !scope.showContact[index];
          }

          scope.onSuccess = function(blob) {
            scope.app.submissionPaths.push(blob.url);
            scope.files.push(blob);
          };

          scope.removeFile = function(index) {
            scope.files.splice(index, 1);
            scope.app.submissionPaths.splice(index, 1);
          };

          scope.toggleOpened = function(date) {
            date.opened = !date.opened;
          }
        }
      }
    }
  }
});
