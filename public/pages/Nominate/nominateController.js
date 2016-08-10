app.controller('nominateController', function($scope) {
  $scope.message = 'Nominations for the 2017-2018 WRAMTAS board will open on February 13th, 2017 and close on March 13th, 2017';

  $scope.form = {};

  $scope.universities = [{
    id: 1,
    name: 'Utah State University'
  }, {
    id: 2,
    name: 'Marylhurst University'
  }];

  $scope.positions = [{
    id: 1,
    name: 'President'
  }, {
    id: 2,
    name: 'Under-President'
  }];

  $scope.form.position = $scope.positions[0];
  $scope.form.university = $scope.universities[0];
});
