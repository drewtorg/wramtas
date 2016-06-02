app.service('postsService', function($http){

    this.getPosts = function(){
        return $http.get('/posts');
    };
});
