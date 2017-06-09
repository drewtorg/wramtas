app.directive('wraPdf', function() {
  return {
    restrict: 'E',
    templateUrl: 'pages/Shared/directives/pdf/pdf.html',
    scope: {
      pdfUrl: '@'
    },
    controller: ['$scope', function($scope) {

    }]
  };
});
