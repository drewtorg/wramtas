app.config(['flowFactoryProvider', function(flowFactoryProvider) {
  flowFactoryProvider.defaults = {
    target: '/images',
    // permanentErrors: [404, 500, 501],
    singleFile: true,
    testChunks: false
  };
}]);
