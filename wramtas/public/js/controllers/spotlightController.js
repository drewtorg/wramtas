	﻿app.controller('spotlightController', function ($scope, $sce) {
	$scope.posts = [
		{
			html: '<h2>Music Therapy</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sapien metus, congue vitae accumsan ut, aliquam quis elit. Phasellus at euismod leo. Donec finibus, lacus id pharetra sagittis, leo nunc cursus mauris, nec ullamcorper dui sapien ut ipsum. Proin id aliquam turpis. Nulla scelerisque rutrum lorem at tincidunt. Ut eu facilisis quam, ut varius augue. Donec est nisi, faucibus non molestie quis, fermentum id enim. Aenean et dui sit amet turpis tristique venenatis. Vivamus condimentum volutpat arcu, id tincidunt sem fermentum non. Ut ut erat ut turpis eleifend vulputate. Nunc bibendum enim ante, nec pellentesque sem dapibus quis. Morbi efficitur convallis fermentum. Ut et odio in dolor congue hendrerit sed vel metus. Fusce sed eros posuere, rutrum odio quis, egestas neque.</p>',
			datePosted: 'February 10, 2016',
		},
		{
			html: '<h2>Music Therapy and stuff</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sapien metus, congue vitae accumsan ut, aliquam quis elit. Phasellus at euismod leo. Donec finibus, lacus id pharetra sagittis, leo nunc cursus mauris, nec ullamcorper dui sapien ut ipsum. Proin id aliquam turpis. Nulla scelerisque rutrum lorem at tincidunt. Ut eu facilisis quam, ut varius augue. Donec est nisi, faucibus non molestie quis, fermentum id enim. Aenean et dui sit amet turpis tristique venenatis. Vivamus condimentum volutpat arcu, id tincidunt sem fermentum non. Ut ut erat ut turpis eleifend vulputate. Nunc bibendum enim ante, nec pellentesque sem dapibus quis. Morbi efficitur convallis fermentum. Ut et odio in dolor congue hendrerit sed vel metus. Fusce sed eros posuere, rutrum odio quis, egestas neque.</p>',
			datePosted: 'February 8, 2016',
		},
		{
			html: '<h2>Dat Internship</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sapien metus, congue vitae accumsan ut, aliquam quis elit. Phasellus at euismod leo. Donec finibus, lacus id pharetra sagittis, leo nunc cursus mauris, nec ullamcorper dui sapien ut ipsum. Proin id aliquam turpis. Nulla scelerisque rutrum lorem at tincidunt. Ut eu facilisis quam, ut varius augue. Donec est nisi, faucibus non molestie quis, fermentum id enim. Aenean et dui sit amet turpis tristique venenatis. Vivamus condimentum volutpat arcu, id tincidunt sem fermentum non. Ut ut erat ut turpis eleifend vulputate. Nunc bibendum enim ante, nec pellentesque sem dapibus quis. Morbi efficitur convallis fermentum. Ut et odio in dolor congue hendrerit sed vel metus. Fusce sed eros posuere, rutrum odio quis, egestas neque.</p>',
			datePosted: 'February 6, 2016',
			dateModified: 'April 11, 2016',
		},
	];

	$scope.addBlogPost = function(){
		newPost = {
			html: '',
			inEditMode: true,
		};
		$scope.posts.unshift(newPost);
	};
});
