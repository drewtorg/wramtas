app.service('pageListService', function($http) {
  this.savePageList = function(pageList) {
    return $http.put('/api/v1/page-list', {pages: pageList});
  };

  this.getPageList = function() {
    return $http.get('/api/v1/page-list');
  };
});
