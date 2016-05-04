app.directive('blogPost', function ($sce) {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/blogPost.html',
        scope:{
            post: '='
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
              		toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | preview media fullpage | forecolor backcolor',
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

                  // TODO: Test to make sure no XSS can happen here!
                  scope.trustAsHtml = function (string) {
                      return $sce.trustAsHtml(string);
                  };

                  scope.inEditMode = false;

                  scope.toggleEditMode = function()
                  {
                      scope.inEditMode = !scope.inEditMode;
                  };
              }
            }
        },
    };
});
