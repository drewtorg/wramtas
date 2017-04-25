app.directive('wraSubmissionApp', function(
    $sce,
    authService,
    filepickerService,
    submissionsService,
    TINY_MCE_OPTIONS) {
  return {
    restrict: 'E',
    templateUrl: '/pages/Submissions/submissionApp/submissionApp.html',
    scope: {
      submission: '=',
      onDelete: '&'
    },
    compile: function() {
      return {
        pre: function(scope) {
          scope.tinymceOptions = TINY_MCE_OPTIONS;
        },
        post: function(scope) {
          scope.submission.inEditMode =
            angular.isDefined(scope.submission.inEditMode)
              ? scope.submission.inEditMode
              : false;
          scope.showApp = false;
          scope.app = {
            name: '',
            amtaId: '',
            email: '',
            submissionPaths: []
          };
          scope.showContact =
            new Array(scope.submission.submissions.length).fill(false);
          scope.files = [];
          scope.showSavedMessage = false;
          scope.dates = {
            openDate: {
              date: Date.parse(scope.submission.openDate),
              opened: false
            },
            closeDate: {
              date: Date.parse(scope.submission.closeDate),
              opened: false
            }
          };
          scope.isSubmissionOpen =
            Date.now() > scope.dates.openDate.date &&
            Date.now() < scope.dates.closeDate.date;
          scope.format = 'MM/dd/yy h:mm a';
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
            scope.submission.inEditMode = !scope.submission.inEditMode;
          };

          scope.toggleShowApp = function() {
            scope.showApp = !scope.showApp;
            if (scope.showSavedMessage) scope.showSavedMessage = false;
          };

          scope.toggleShowSaved = function() {
            scope.showSavedMessage = !scope.showSavedMessage;
          };

          scope.editSubmission = function() {
            scope.toggleEditMode();
            scope.tempSubmission = angular.copy(scope.submission);
          };

          scope.deleteSubmission = function() {
            scope.onDelete();
            submissionsService.deleteSubmission(scope.submission);
          };

          scope.saveSubmission = function() {
            if (angular.isDefined(scope.tempSubmission)) {
              scope.submission.prompt =
                angular.copy(scope.tempSubmission.prompt);
              scope.submission.numUploads =
                angular.copy(scope.tempSubmission.numUploads);
              scope.submission.openDate =
                angular.copy(scope.dates.openDate.date);
              scope.submission.closeDate =
                angular.copy(scope.dates.closeDate.date);
              scope.isSubmissionOpen =
                Date.now() > scope.dates.openDate.date &&
                Date.now() < scope.dates.closeDate.date;

              submissionsService.saveSubmission(scope.submission);
              scope.toggleEditMode();
            }
          };

          scope.undoEdits = function() {
            // this is the case when we are undoing after clicking edit
            if (angular.isDefined(scope.tempSubmission)) {
              scope.tempSubmission =
                angular.copy(scope.submission);
              scope.dates.openDate.date =
                Date.parse(scope.submission.openDate);
              scope.dates.closeDate.date =
                Date.parse(scope.submission.closeDate);
            }

            // this is the case when we are undoing after clicking add
            if (!angular.isDefined(scope.tempSubmission) ||
                scope.tempSubmission.prompt === '')
              scope.deleteSubmission();

            scope.toggleEditMode();
          };

          scope.submitSubmissionApp = function() {
            submissionsService
              .uploadSubmissionApplication(scope.submission._id, scope.app);
            scope.showContact.push(false);
            scope.toggleShowApp();
            scope.toggleShowSaved();
          };

          scope.toggleContactInfo = function(index) {
            scope.showContact[index] = !scope.showContact[index];
          };

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
          };
        }
      };
    }
  };
});
