
app.controller('homeController', function($scope, postsService) {
  $scope.page = 'home';

  postsService.getPosts($scope.page).then(function(response) {
    $scope.articles = response.data;
  });
});
