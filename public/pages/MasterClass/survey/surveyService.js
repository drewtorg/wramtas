app.service('surveyService', function($http) {
  this.saveSurveyReponses = function(info) {
    return $http.post('/api/v1/master-class/survey', info);
  };
});
