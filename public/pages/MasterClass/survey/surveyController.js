app.controller('SurveyController', function(
    $scope,
    authService,
    surveyService) {
  $scope.hello = 'yo';
  $scope.survey = {};

  surveyService.getSurvey().then(function(res) {
    $scope.survey = res.body;
  });

  $scope.addQuestion = function() {
    $scope.survey.push({
      question: '',
      inputType: '',
      validResponses: ''
    });
  };



  $scope.isAdmin = function() {
    return authService.isAdmin();
  };
});
