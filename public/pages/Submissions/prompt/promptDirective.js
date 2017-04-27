app.directive('wraSubmissionPrompt', function(
    $sce,
    authService,
    filepickerService,
    submissionsService,
    dateService,
    DATE_OPTIONS,
    TINY_MCE_OPTIONS) {
  return {
    restrict: 'E',
    templateUrl: '/pages/Submissions/prompt/prompt.html',
    scope: {
      prompt: '=',
      type: '@',
      onDelete: '&'
    },
    compile: function() {
      return {
        pre: function(scope) {
          scope.tinymceOptions = TINY_MCE_OPTIONS;
        },
        post: function(scope) {
          scope.prompt.inEditMode =
            angular.isDefined(scope.prompt.inEditMode)
              ? scope.prompt.inEditMode
              : false;
          scope.tempPrompt = angular.copy(scope.prompt);
          scope.showApp = false;
          scope.app = {
            name: '',
            amtaId: '',
            email: '',
            uploadPaths: []
          };
          scope.showContact =
            new Array(scope.prompt.applications.length).fill(false);
          scope.files = [];
          scope.showSavedMessage = false;
          scope.format = DATE_OPTIONS.format;
          scope.dateOptions = DATE_OPTIONS.datepickerOptions;

          scope.isAdmin = function() {
            return authService.isAdmin();
          };

          scope.trustAsHtml = function(string) {
            return $sce.trustAsHtml(string);
          };

          scope.toggleEditMode = function() {
            scope.prompt.inEditMode = !scope.prompt.inEditMode;
          };

          scope.toggleShowApp = function() {
            scope.showApp = !scope.showApp;
            if (scope.showSavedMessage) scope.showSavedMessage = false;
          };

          scope.toggleShowSaved = function() {
            scope.showSavedMessage = !scope.showSavedMessage;
          };

          scope.editPrompt = function() {
            scope.toggleEditMode();
            scope.tempPrompt = angular.copy(scope.prompt);
          };

          scope.deletePrompt = function() {
            scope.onDelete();
            submissionsService.deletePrompt(scope.prompt);
          };

          scope.savePrompt = function() {
            if (angular.isDefined(scope.tempPrompt)) {
              scope.prompt = angular.copy(scope.tempPrompt);
              // format dates for backend
              var prompt = angular.copy(scope.prompt);
              prompt.dates = dateService.toBackendDateFormat(prompt.dates);
              submissionsService.savePrompt(prompt);
              scope.toggleEditMode();
            }
          };

          scope.undoEdits = function() {
            // this is the case when we are undoing after clicking edit
            if (angular.isDefined(scope.tempPrompt)) {
              scope.tempPrompt = angular.copy(scope.prompt);
            }

            // this is the case when we are undoing after clicking add
            if (!angular.isDefined(scope.tempPrompt) ||
                scope.tempPrompt.description === '')
              scope.deletePrompt(scope.prompt);

            scope.toggleEditMode();
          };

          scope.submitApplication = function() {
            submissionsService.uploadApplication(scope.prompt._id, scope.app);
            scope.showContact.push(false);
            scope.toggleShowApp();
            scope.toggleShowSaved();
          };

          scope.toggleContactInfo = function(index) {
            scope.showContact[index] = !scope.showContact[index];
          };

          scope.onSuccess = function(blob) {
            scope.app.uploadPaths.push(blob.url);
            scope.files.push(blob);
          };

          scope.removeFile = function(index) {
            scope.files.splice(index, 1);
            scope.app.uploadPaths.splice(index, 1);
          };

          scope.toggleOpened = function(date) {
            date.opened = !date.opened;
          };

          scope.isPromptOpen = function() {
            return Date.now() > scope.prompt.dates.openDate.date &&
                     Date.now() < scope.prompt.dates.closeDate.date;
          };
        }
      };
    }
  };
});
