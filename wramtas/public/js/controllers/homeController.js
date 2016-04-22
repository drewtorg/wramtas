
app.controller('homeController', function ($scope) {
	$scope.message = 'News!';

    $scope.articles = [
        {
            title: 'Music Therapy is Cool!',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sapien metus, congue vitae accumsan ut, aliquam quis elit. Phasellus at euismod leo. Donec finibus, lacus id pharetra sagittis, leo nunc cursus mauris, nec ullamcorper dui sapien ut ipsum. Proin id aliquam turpis. Nulla scelerisque rutrum lorem at tincidunt. Ut eu facilisis quam, ut varius augue. Donec est nisi, faucibus non molestie quis, fermentum id enim. Aenean et dui sit amet turpis tristique venenatis. Vivamus condimentum volutpat arcu, id tincidunt sem fermentum non. Ut ut erat ut turpis eleifend vulputate. Nunc bibendum enim ante, nec pellentesque sem dapibus quis. Morbi efficitur convallis fermentum. Ut et odio in dolor congue hendrerit sed vel metus. Fusce sed eros posuere, rutrum odio quis, egestas neque.',
            date: 'February 10th, 2016'
        },
        {
            title: 'Music Therapy is Awesome!',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sapien metus, congue vitae accumsan ut, aliquam quis elit. Phasellus at euismod leo. Donec finibus, lacus id pharetra sagittis, leo nunc cursus mauris, nec ullamcorper dui sapien ut ipsum. Proin id aliquam turpis. Nulla scelerisque rutrum lorem at tincidunt. Ut eu facilisis quam, ut varius augue. Donec est nisi, faucibus non molestie quis, fermentum id enim. Aenean et dui sit amet turpis tristique venenatis. Vivamus condimentum volutpat arcu, id tincidunt sem fermentum non. Ut ut erat ut turpis eleifend vulputate. Nunc bibendum enim ante, nec pellentesque sem dapibus quis. Morbi efficitur convallis fermentum. Ut et odio in dolor congue hendrerit sed vel metus. Fusce sed eros posuere, rutrum odio quis, egestas neque.',
            date: 'February 8th, 2016'
        },
		{
            title: 'Music Therapy is Love!',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sapien metus, congue vitae accumsan ut, aliquam quis elit. Phasellus at euismod leo. Donec finibus, lacus id pharetra sagittis, leo nunc cursus mauris, nec ullamcorper dui sapien ut ipsum. Proin id aliquam turpis. Nulla scelerisque rutrum lorem at tincidunt. Ut eu facilisis quam, ut varius augue. Donec est nisi, faucibus non molestie quis, fermentum id enim. Aenean et dui sit amet turpis tristique venenatis. Vivamus condimentum volutpat arcu, id tincidunt sem fermentum non. Ut ut erat ut turpis eleifend vulputate. Nunc bibendum enim ante, nec pellentesque sem dapibus quis. Morbi efficitur convallis fermentum. Ut et odio in dolor congue hendrerit sed vel metus. Fusce sed eros posuere, rutrum odio quis, egestas neque.',
            date: 'February 6th, 2016'
        },
    ];
});
