app.directive('bio', function(biosService) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/bio.html',
    scope: {
      bio: '=',
      type: '=',
      onDelete: '&',
    },
    controller: ['$scope', function($scope) {
      // $scope.bio.inEditMode = angular.isDefined($scope.bio.inEditMode) ? $scope.bio.inEditMode : false;
      //
      // $scope.toggleEditMode = function() {
      //   $scope.bio.inEditMode = !$scope.bio.inEditMode;
      // };
      //
      // $scope.editBio = function() {
      //   $scope.tempBio = angular.copy($scope.bio);
      //   $scope.toggleEditMode();
      // };
      //
      // $scope.deleteBio = function() {
      //   $scope.onDelete();
      //   biosService.deleteBios($scope.type, $scope.bio);
      // };
      //
      // $scope.saveBio = function() {
      //   if (angular.isDefined($scope.tempBio))
      //     $scope.bio.about = angular.copy($scope.tempBio.about);
      //
      //   biosService.saveBio($scope.type, $scope.bio).then(function(response) {
      //     $scope.toggleEditMode();
      //   });
      // };
      //
      // $scope.undoBio = function() {
      //   // this is the case when we are undoing after clicking edit
      //   if (angular.isDefined($scope.tempBio))
      //     $scope.tempBio.about = angular.copy($scope.bio.about);
      //
      //   // this is the case when we are undoing after clicing add
      //   if (!angular.isDefined($scope.tempBio) || $scope.tempBio.about === '')
      //     $scope.deleteBio();
      //
      //   $scope.toggleEditMode();
      // };
    }]
  }
});
