app.directive('blog', function($sce, postsService, authService) {
  return {
    restrict: 'E',
    templateUrl: 'Shared/directives/blog/blog.html',
    scope: {
      page: '@'
    },
    controller: ['$scope', function($scope) {
      postsService.getPosts($scope.page).then(function(response) {
        $scope.posts = response.data;
      });

      $scope.isAdmin = function() {
        return authService.isAdmin();
      };

      $scope.addBlogPost = function() {
        var newPost = {
          html: '',
          inEditMode: true,
        };
        postsService.createPost($scope.page).then(function(response) {
          newPost._id = response.data._id;
          newPost.datePosted = response.data.datePosted;
          newPost.dateModified = response.data.dateModified;
          $scope.posts.unshift(newPost);
        });
      };
    }],
  };
});
