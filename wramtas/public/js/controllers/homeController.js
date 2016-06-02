app.controller('homeController', function ($scope, postsService) {
    postsService.getPosts().then(function(response){
        $scope.articles = response.data;
    });
});
