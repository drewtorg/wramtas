app.controller('spotlightController', function ($scope, $sce) {
	$scope.articles = [
		{
			title: 'Check out this awesome internship!',
			html: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sapien metus, congue vitae accumsan ut, aliquam quis elit. Phasellus at euismod leo. Donec finibus, lacus id pharetra sagittis, leo nunc cursus mauris, nec ullamcorper dui sapien ut ipsum. Proin id aliquam turpis. Nulla scelerisque rutrum lorem at tincidunt. Ut eu facilisis quam, ut varius augue. Donec est nisi, faucibus non molestie quis, fermentum id enim. Aenean et dui sit amet turpis tristique venenatis. Vivamus condimentum volutpat arcu, id tincidunt sem fermentum non. Ut ut erat ut turpis eleifend vulputate. Nunc bibendum enim ante, nec pellentesque sem dapibus quis. Morbi efficitur convallis fermentum. Ut et odio in dolor congue hendrerit sed vel metus. Fusce sed eros posuere, rutrum odio quis, egestas neque.</p>',
			date: 'February 10th, 2016',
		},
		{
			title: 'Music Therapy is Awesome!',
			html: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sapien metus, congue vitae accumsan ut, aliquam quis elit. Phasellus at euismod leo. Donec finibus, lacus id pharetra sagittis, leo nunc cursus mauris, nec ullamcorper dui sapien ut ipsum. Proin id aliquam turpis. Nulla scelerisque rutrum lorem at tincidunt. Ut eu facilisis quam, ut varius augue. Donec est nisi, faucibus non molestie quis, fermentum id enim. Aenean et dui sit amet turpis tristique venenatis. Vivamus condimentum volutpat arcu, id tincidunt sem fermentum non. Ut ut erat ut turpis eleifend vulputate. Nunc bibendum enim ante, nec pellentesque sem dapibus quis. Morbi efficitur convallis fermentum. Ut et odio in dolor congue hendrerit sed vel metus. Fusce sed eros posuere, rutrum odio quis, egestas neque.</p>',
			date: 'February 8th, 2016',
		},
		{
			title: 'Music Therapy is Love!',
			html: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sapien metus, congue vitae accumsan ut, aliquam quis elit. Phasellus at euismod leo. Donec finibus, lacus id pharetra sagittis, leo nunc cursus mauris, nec ullamcorper dui sapien ut ipsum. Proin id aliquam turpis. Nulla scelerisque rutrum lorem at tincidunt. Ut eu facilisis quam, ut varius augue. Donec est nisi, faucibus non molestie quis, fermentum id enim. Aenean et dui sit amet turpis tristique venenatis. Vivamus condimentum volutpat arcu, id tincidunt sem fermentum non. Ut ut erat ut turpis eleifend vulputate. Nunc bibendum enim ante, nec pellentesque sem dapibus quis. Morbi efficitur convallis fermentum. Ut et odio in dolor congue hendrerit sed vel metus. Fusce sed eros posuere, rutrum odio quis, egestas neque.</p>',
			date: 'February 6th, 2016',
		},
	];

	$scope.tinymceOptions = {
		selector: 'textarea',
		theme: 'modern',
		plugins: [
			'advlist autolink link image imagetools lists charmap preview hr anchor pagebreak spellchecker',
			'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
			'save table contextmenu directionality template paste textcolor'
		],
		height: 400,
		//content_css: '../../stylesheets/content.css',
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
	
	// TODO: Test to make sure no XSS can happen here!
	$scope.trustAsHtml = function (string) {
		return $sce.trustAsHtml(string);
	};
});