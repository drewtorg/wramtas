app.directive('bio', function(biosService, authService) {
  return {
    restrict: 'E',
    templateUrl: '/pages/About/bio/bio.html',
    scope: {
      bio: '=',
      type: '@',
      onDelete: '&',
    },
    controller: ['$scope', function($scope) {
      $scope.bio.inEditMode = angular.isDefined($scope.bio.inEditMode) ? $scope.bio.inEditMode : false;
      $scope.tempBio = angular.copy($scope.bio);

      $scope.isAdmin = function() {
        return authService.isAdmin();
      };

      $scope.toggleEditMode = function() {
        $scope.bio.inEditMode = !$scope.bio.inEditMode;
      };

      $scope.editBio = function() {
        $scope.toggleEditMode();
        $scope.tempBio = angular.copy($scope.bio);
      };

      $scope.deleteBio = function() {
        $scope.onDelete();
        biosService.deleteBio($scope.type, $scope.bio);
      };

      $scope.saveBio = function() {
        if (angular.isDefined($scope.tempBio)) {
          $scope.bio.about = angular.copy($scope.tempBio.about);
          $scope.bio.name = angular.copy($scope.tempBio.name);
          $scope.bio.title = angular.copy($scope.tempBio.title);
          $scope.bio.email = angular.copy($scope.tempBio.email);
          $scope.bio.image = angular.copy($scope.tempBio.image);
          biosService.saveBio($scope.type, $scope.bio).then(function(response) {
            $scope.toggleEditMode();
          });
        }
      };

      $scope.undoBio = function() {
        // this is the case when we are undoing after clicking edit
        if (angular.isDefined($scope.tempBio))
          $scope.tempBio = angular.copy($scope.bio);

        // this is the case when we are undoing after clicking add
        if (!angular.isDefined($scope.tempBio))
          $scope.deleteBio();

        $scope.toggleEditMode();
      };

      $scope.onSuccess = function(blob) {
        $scope.tempBio.image = blob.url;
      };
    }]
  }
});
