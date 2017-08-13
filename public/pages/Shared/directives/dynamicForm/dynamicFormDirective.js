app.directive('wraDynamicForm', function(
    authService,
    TINY_MCE_OPTIONS) {
  return {
    restrict: 'E',
    templateUrl: 'pages/Shared/directives/dynamicForm/dynamicForm.html',
    scope: {
      form: '=',
      response: '='
    },
    controller: ['$scope', function($scope) {
      $scope.tinymceOptions = TINY_MCE_OPTIONS;
      $scope.userMode = false;

      $scope.addInput = function() {
        $scope.form.push({
          label: '',
          inputType: 'text',
          validOptions: []
        });
      };

      $scope.deleteInput = function(index) {
        $scope.form.splice(index, 1);
      };

      $scope.addOption = function(input) {
        input.validOptions.push('');
      };

      $scope.deleteOption = function(input, index) {
        input.validOptions.splice(index, 1);
      };

      $scope.isAdmin = function() {
        return authService.isAdmin();
      };

      $scope.allowAddOption = function(type) {
        return type === 'radio' || type === 'checkbox' || type === 'select';
      };

      $scope.toggleUserMode = function() {
        $scope.userMode = !$scope.userMode;
      };
    }]
  };
});
