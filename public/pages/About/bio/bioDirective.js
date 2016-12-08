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
      $scope.uploader = {};
      $scope.bio.inEditMode = angular.isDefined($scope.bio.inEditMode) ? $scope.bio.inEditMode : false;

      $scope.isAdmin = function() {
        return authService.isAdmin();
      };

      $scope.onFileUploadSuccess = function($message) {
        var res = JSON.parse($message);
        $scope.bio.image = angular.copy('uploads/' + res[0].filename);

        biosService.saveBio($scope.type, $scope.bio).then(function(response) {
          $scope.toggleEditMode();
        });
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
          if ($scope.uploader.flow.files.length)
            $scope.uploader.flow.upload();
          else
            biosService.saveBio($scope.type, $scope.bio).then(function(response) {
              $scope.toggleEditMode();
            });
        }
      };

      $scope.undoBio = function() {
        $scope.uploader.flow.cancel();

        // this is the case when we are undoing after clicking edit
        if (angular.isDefined($scope.tempBio))
          $scope.tempBio = angular.copy($scope.bio);

        // this is the case when we are undoing after clicking add
        if (!angular.isDefined($scope.tempBio))
          $scope.deleteBio();

        $scope.toggleEditMode();
      };
    }]
  }
});
