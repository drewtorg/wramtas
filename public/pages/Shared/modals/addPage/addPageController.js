app.controller('AddPageController', function($scope) {
  $scope.form = {
    pageType: '',
    title: ''
  };

  $scope.onSubmit = function() {
    console.log('On Submit');
    $scope.$close($scope.form);
  };

  $scope.onCancel = function() {
    console.log('On Cancel');
    $scope.$dismiss('cancel');
  };
});
