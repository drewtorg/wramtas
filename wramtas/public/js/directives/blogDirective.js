app.directive('blog', function ($sce) {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/blog.html',
        scope:{
            posts: '=',
        },
        controller: ['$scope', function($scope) {
        	$scope.addBlogPost = function(){
        		var newPost = {
        			html: '',
        			inEditMode: true,
        		};
        		$scope.posts.unshift(newPost);
        	};
        }],
    };
});
