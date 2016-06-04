app.directive('blogPost', function($sce, postsService) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/blogPost.html',
    scope: {
      post: '=',
      onDelete: '&',
      page: '=',
    },
    compile: function(tElem, tAttrs) {
      return {
        pre: function(scope, iElem, iAttrs) {
          scope.tinymceOptions = {
            selector: 'textarea',
            theme: 'modern',
            plugins: [
              'advlist autolink link image imagetools lists charmap preview hr anchor pagebreak spellchecker',
              'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
              'save table contextmenu directionality template paste textcolor'
            ],
            height: 400,
            toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media fullpage | forecolor',
            imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
            style_formats_merge: true,
            style_formats: [{
              title: 'Images',
              items: [{
                title: 'Float Left',
                selector: 'img',
                styles: {
                  'float': 'left',
                  'margin': '0 10px 0 10px'
                }
              }, {
                title: 'Float Right',
                selector: 'img',
                styles: {
                  'float': 'right',
                  'margin': '0 10px 0 10px'
                }
              }, {
                title: 'Shadow Box',
                selector: 'img',
                styles: {
                  'box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2)'
                }
              }]
            }]
          };
        },
        post: function(scope, iElem, iAttrs) {
          scope.post.inEditMode = angular.isDefined(scope.post.inEditMode) ? scope.post.inEditMode : false;

          // TODO: Test to make sure no XSS can happen here!
          scope.trustAsHtml = function(string) {
            return $sce.trustAsHtml(string);
          };

          scope.getPrettyDate = function(uglyDateString) {
            var options = {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            };
            return new Date(uglyDateString).toLocaleDateString('en-US', options);
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

            console.log(scope.page);
            postsService.savePost(scope.page, scope.post).then(function(response) {
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
            if (!angular.isDefined(scope.tempPost) || scope.tempPost.html === '')
              scope.deletePost();

            scope.toggleEditMode();
          };
        }
      }
    },
  };
});
