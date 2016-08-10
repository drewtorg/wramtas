app.controller('affiliatesController', function($scope, universitiesService) {
  $scope.universities = {};

  $scope.affiliates = [{
    text: 'American Music Therapy Association Students',
    link: 'http://www.amtas.org/'
  }, {
    text: 'American Music Therapy Association',
    link: 'http://www.musictherapy.org/'
  }, {
    text: 'The Western Region Chapter of the American Music Therapy Association',
    link: 'http://www.wramta.org/'
  }, ];


  $scope.otherResources = [{
    text: 'The Certification Board for Music Therapists',
    link: 'http://www.cbmt.org/'
  }, {
    text: 'World Federation of Music Therapy for Students',
    link: 'http://wfmt.info/WFMT/WFMT_for_Students.html'
  }, {
    text: 'World Federation of Music Therapy',
    link: 'http://www.wfmt.info/'
  }, {
    text: 'Voices: A World Forum for Music Therapy',
    link: 'https://voices.no/index.php/voices'
  }, ];

  universitiesService.getUniversities().then(function(response) {
    $scope.universities = response.data;
  })
});
