
app.controller('spotlightController', function($scope, postsService) {
  $scope.page = 'spotlight';

  postsService.getPosts($scope.page).then(function(response) {
    $scope.posts = response.data;
  });
});
