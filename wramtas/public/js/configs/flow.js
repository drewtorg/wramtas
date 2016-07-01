app.config(['flowFactoryProvider', function(flowFactoryProvider) {
  flowFactoryProvider.defaults = {
    target: '/images',
    // permanentErrors: [404, 500, 501],
    singleFile: true,
    testChunks: false
  };
  // You can also set default events:
  // flowFactoryProvider.on('catchAll', function(event) {
  //   ...
  // });
  // Can be used with different implementations of Flow.js
  // flowFactoryProvider.factory = fustyFlowFactory;
}]);
