app.controller('SurveyController', function(
    $scope,
    authService,
    masterClassService,
    surveyService) {
  $scope.survey = {};
  $scope.responses = [];

  masterClassService.getMasterClass().then(function(res) {
    $scope.survey = res.data.survey;
    $scope.survey.forEach(function(s) {
      if (s.inputType === 'checkbox') {
        $scope.responses.push(
          Array(s.validOptions.length).fill(false));
      }
      else if (s.inputType === 'select' || s.inputType === 'radio') {
        $scope.responses.push(0);
      }
      else $scope.responses.push('');
    });
  });

  $scope.addQuestion = function() {
    $scope.survey.push({
      question: '',
      inputType: 'text',
      validOptions: [],
      tallies: [],
      responses: []
    });
  };

  $scope.addOption = function(question) {
    question.validOptions.push('');
    question.tallies.push(0);
  };

  $scope.saveSurvey = function() {
    surveyService.saveSurveyResponses($scope.responses);
    $scope.$close($scope.survey);
  };

  $scope.isAdmin = function() {
    return authService.isAdmin();
  };

  $scope.allowCreateResponses = function(type) {
    return type === 'radio' || type === 'checkbox' || type === 'select';
  };
});
