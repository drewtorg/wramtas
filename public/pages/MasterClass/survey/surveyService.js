app.service('surveyService', function($http) {
  this.saveSurveyResponses = function(responses) {
    return $http.post('/api/v1/master-class/survey', responses);
  };
});
