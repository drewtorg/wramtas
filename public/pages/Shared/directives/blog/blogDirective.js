app.directive('wraBlog', function($sce, $location, postsService, authService) {
  return {
    restrict: 'E',
    templateUrl: 'pages/Shared/directives/blog/blog.html',
    scope: {
      page: '@'
    },
    controller: ['$scope', function($scope) {
      $scope.currentPage = 1;
      $scope.itemsPerPage = 5;

      postsService.getPosts($scope.page).then(function(response) {
        if (response.data) {
          $scope.posts = response.data;
        }
        else {
          $location.path('/');
        }
      });

      $scope.isAdmin = function() {
        return authService.isAdmin();
      };

      $scope.addBlogPost = function() {
        var newPost = {
          html: '',
          pdfUrl: '',
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
