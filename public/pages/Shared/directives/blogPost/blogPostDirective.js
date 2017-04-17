app.directive('wraBlogPost', function(
    $sce,
    postsService,
    authService,
    TINY_MCE_OPTIONS) {
  return {
    restrict: 'E',
    templateUrl: 'pages/Shared/directives/blogPost/blogPost.html',
    scope: {
      post: '=',
      page: '=',
      onDelete: '&',
    },
    compile: function() {
      return {
        pre: function(scope) {
          scope.tinymceOptions = TINY_MCE_OPTIONS;
        },
        post: function(scope) {
          scope.post.inEditMode = angular.isDefined(scope.post.inEditMode)
                                                    ? scope.post.inEditMode
                                                    : false;

          scope.isAdmin = function() {
            return authService.isAdmin();
          };

          scope.trustAsHtml = function(string) {
            return $sce.trustAsHtml(string);
          };

          scope.getPrettyDate = function(uglyDateString) {
            var options = {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            };
            return new Date(uglyDateString)
              .toLocaleDateString('en-US', options);
          };

          scope.showPostedDate = function() {
            return scope.post.datePosted === scope.post.dateModified;
          };

          scope.showModifiedDate = function() {
            return scope.post.dateModified !== scope.post.datePosted;
          };

          scope.toggleEditMode = function() {
            scope.post.inEditMode = !scope.post.inEditMode;
          };

          scope.editPost = function() {
            scope.tempPost = angular.copy(scope.post);
            scope.toggleEditMode();
          };

          scope.deletePost = function() {
            scope.onDelete();
            postsService.deletePost(scope.page, scope.post);
          };

          scope.savePost = function() {
            if (angular.isDefined(scope.tempPost))
              scope.post.html = angular.copy(scope.tempPost.html);

            postsService.savePost(scope.page, scope.post)
              .then(function(response) {
              scope.post.datePosted = response.data.datePosted;
              scope.post.dateModified = response.data.dateModified;
              scope.toggleEditMode();
            });
          };

          scope.undoPost = function() {
            // this is the case when we are undoing after clicking edit
            if (angular.isDefined(scope.tempPost))
              scope.tempPost.html = angular.copy(scope.post.html);

            // this is the case when we are undoing after clicing add
            if (!angular.isDefined(scope.tempPost) ||
                scope.tempPost.html === '') {
              scope.deletePost();
            }

            scope.toggleEditMode();
          };
        }
      };
    },
  };
});
