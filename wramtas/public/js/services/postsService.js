app.service('postsService', function($http) {
  this.getPosts = function(page) {
    return $http.get('/posts?page=' + page);
  };

  this.createPost = function(page) {
    return $http.post('/posts?page=' + page);
  };

  this.savePost = function(page, post) {
    return $http.put('/posts/' + post._id + '?page=' + page, post);
  };

  this.deletePost = function(page, post) {
    return $http.delete('/posts/' + post._id + '?page=' + page);
  };
});
