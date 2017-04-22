app.service('postsService', function($http) {
  this.getPosts = function(page) {
    return $http.get('/api/v1/posts?page=' + page);
  };

  this.createPost = function(page) {
    return $http.post('/api/v1/posts?page=' + page);
  };

  this.savePost = function(page, post) {
    return $http.put('/api/v1/posts/' + post._id + '?page=' + page, post);
  };

  this.deletePost = function(page, post) {
    return $http.delete('/api/v1/posts/' + post._id + '?page=' + page);
  };
});
