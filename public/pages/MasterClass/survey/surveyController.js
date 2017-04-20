app.controller('SurveyController', function(
    $scope,
    authService,
    masterClassService,
    surveyService) {
  $scope.hello = 'yo';
  $scope.survey = {};
  $scope.responses = [];

  masterClassService.getMasterClass().then(function(res) {
    $scope.survey = res.data.survey;
    $scope.survey.forEach(function(s) {
      if (s.inputType === 'checkbox') {
        $scope.responses.push(
          Array(s.validOptions.length).fill(false));
      } else if (s.inputType === 'select') {
        $scope.responses.push(s.validOptions[0]);
      } else
        $scope.responses.push('');
    });
  });

  $scope.addQuestion = function() {
    $scope.survey.push({
      question: '',
      inputType: 'text',
      validOptions: []
    });
  };

  $scope.addResponse = function(question) {
    question.validOptions.push('');
  };

  $scope.saveSurvey = function() {
    console.log($scope.responses);
    // surveyService.saveSurvey($scope.survey);
    // $scope.$close($scope.survey);
  };

  $scope.isAdmin = function() {
    return authService.isAdmin();
  };

  $scope.allowCreateResponses = function(type) {
    return type === 'radio' || type === 'checkbox' || type === 'select';
  };
});
