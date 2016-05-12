app.directive('blogPost', function ($sce) {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/blogPost.html',
        scope:{
            post: '=',
            onDelete: '&',
        },
        compile: function(tElem, tAttrs){
            return {
              pre: function(scope, iElem, iAttrs){
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
              		style_formats: [
              			{
              				title: 'Images', items: [
              					{
              						title: 'Float Left', selector: 'img', styles: {
              							'float' : 'left',
              							'margin': '0 10px 0 10px'
              						}
              					},
              					{
              						title: 'Float Right', selector: 'img', styles: {
              							'float' : 'right',
              							'margin': '0 10px 0 10px'
              						}
              					},
              					{
              						title: 'Shadow Box', selector: 'img', styles: {
              							'box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2)'
              						}
              					}
              				]
              			}]
              	};
              },
              post: function(scope, iElem, iAttrs){

                  scope.post.inEditMode = angular.isDefined(scope.post.inEditMode) ? scope.post.inEditMode : false;

                  // TODO: Test to make sure no XSS can happen here!
                  scope.trustAsHtml = function (string) {
                      return $sce.trustAsHtml(string);
                  };

                  scope.toggleEditMode = function (){
                      scope.post.inEditMode = !scope.post.inEditMode;
                  };

                  scope.editPost = function() {
                      scope.tempPost = angular.copy(scope.post);
                      scope.toggleEditMode();
                  };

                  scope.deletePost = function() {
                      scope.onDelete();
                  };

                  scope.savePost = function() {
                      scope.post.html = angular.copy(scope.tempPost.html);

                      var options = { year: 'numeric', month: 'long', day: 'numeric' };

                      if (angular.isDefined(scope.post.datePosted))
                      {
                          scope.post.dateModified = new Date(Date.now()).toLocaleDateString('en-US', options);
                      }
                      else {
                          scope.post.datePosted = new Date(Date.now()).toLocaleDateString('en-US', options);
                      }
                      scope.toggleEditMode();
                  };

                  scope.undoPost = function() {
                      if (scope.post.html === '') {
                          scope.deletePost();
                      }
                      else {
                          scope.tempPost.html = angular.copy(scope.post.html);
                          scope.toggleEditMode();
                      }
                  };
              }
            }
        },
    };
});
