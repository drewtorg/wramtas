app.service('surveyService', function($http) {
  this.saveSurveyResponses = function(page, responses) {
    return $http.post('/api/v1/video-page/' + page + '/survey', responses);
  };
});
