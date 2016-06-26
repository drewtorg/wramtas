app.directive('blog', function($sce, postsService) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/blog.html',
    scope: {
      page: '@'
    },
    controller: ['$scope', function($scope) {
      postsService.getPosts($scope.page).then(function(response) {
        $scope.posts = response.data;
      });

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
