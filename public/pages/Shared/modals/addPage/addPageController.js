app.controller('AddPageController', function($scope, changeCaseService) {
  $scope.form = {
    pageType: 'blog',
    title: ''
  };

  $scope.onSubmit = function() {
    $scope.form.title = changeCaseService.toTitleCase($scope.form.title);
    $scope.$close($scope.form);
  };

  $scope.onCancel = function() {
    $scope.$dismiss('cancel');
  };
});
