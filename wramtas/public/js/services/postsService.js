app.service('postsService', function($http) {
  this.getPosts = function() {
    return $http.get('/posts');
  };

  this.createPost = function() {
    return $http.post('/posts');
  };

  this.savePost = function(post) {
    return $http.put('/posts/' + post._id, post);
  };

  this.deletePost = function(post) {
    return $http.delete('/posts/' + post._id);
  };
});
