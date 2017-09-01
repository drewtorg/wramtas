app.controller('ConfirmController', function($scope, message) {
  $scope.message = message;

  $scope.onConfirm = function() {
    $scope.$close('confirm');
  };

  $scope.onCancel = function() {
    $scope.$dismiss('cancel');
  };
});
