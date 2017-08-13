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
    templateUrl: '/pages/Shared/directives/submission/prompt/prompt.html',
    scope: {
      prompt: '=',
      page: '@',
      onDelete: '&'
    },
    compile: function() {
      return {
        pre: function(scope) {
          scope.tinymceOptions = TINY_MCE_OPTIONS;
        },
        post: function(scope) {
          scope.getDefaultApp = function() {
            var app = {
              uploadPaths: []
            };

            scope.prompt.fields.forEach(function(input) {
              if (input.inputType === 'checkbox') {
                app[input.label] = {};
                input.validOptions.forEach(function(option) {
                  app[input.label][option] = false;
                });
              }
              else {
                app[input.label] = '';
              }
            });

            return app;
          };

          scope.prompt.inEditMode =
            angular.isDefined(scope.prompt.inEditMode)
              ? scope.prompt.inEditMode
              : false;
          scope.tempPrompt = angular.copy(scope.prompt);
          scope.showApp = false;
          scope.app = scope.getDefaultApp();
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
            submissionsService.deletePrompt(scope.page, scope.prompt);
          };

          scope.savePrompt = function() {
            if (angular.isDefined(scope.tempPrompt)) {
              scope.prompt = angular.copy(scope.tempPrompt);
              // format dates for backend
              var prompt = angular.copy(scope.prompt);
              prompt.dates = dateService.toBackendDateFormat(prompt.dates);
              submissionsService.savePrompt(scope.page, prompt);
              scope.app = scope.getDefaultApp();
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
              scope.deletePrompt(scope.page, scope.prompt);

            scope.toggleEditMode();
          };

          scope.submitApplication = function() {
            submissionsService.saveApplication(scope.page,
                                               scope.prompt._id,
                                               scope.app);
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

          scope.isObject = angular.isObject;
        }
      };
    }
  };
});
