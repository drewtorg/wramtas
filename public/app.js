var app = angular.module('wramtasApp', [
   'ngRoute',
   'ui.tinymce',
   'ngSanitize',
   'ngCookies',
   'angular-filepicker',
   'angular.filter',
   'angularSpinner',
   'ui.bootstrap'
]);

app.config(function($routeProvider, $locationProvider, $controllerProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'pages/Home/home.html',
      controller: 'homeController'
    })
    .when('/about', {
      templateUrl: 'pages/About/about.html',
      controller: 'aboutController'
    })
    .when('/affiliates', {
      templateUrl: 'pages/Affiliates/affiliates.html',
      controller: 'affiliatesController'
    })
    .when('/application', {
      templateUrl: 'pages/Application/application.html',
      controller: 'applicationController'
    })
    .when('/candidates', {
      templateUrl: 'pages/Candidates/candidates.html',
      controller: 'candidatesController'
    })
    .when('/conference', {
      templateUrl: 'pages/Conference/conference.html',
      controller: 'conferenceController'
    })
    .when('/donate', {
      templateUrl: 'pages/Donate/donate.html',
      controller: 'donateController'
    }).when('/election-info', {
      templateUrl: 'pages/ElectionInfo/electionInfo.html',
      controller: 'electionInfoController'
    })
    .when('/master-class', {
      templateUrl: 'pages/MasterClass/masterClass.html',
      controller: 'masterClassController'
    })
    .when('/nominate', {
      templateUrl: 'pages/Nominate/nominate.html',
      controller: 'nominateController'
    })
    .when('/scholarships', {
      templateUrl: 'pages/Scholarships/scholarships.html',
      controller: 'scholarshipsController'
    })
    .when('/spotlight', {
      templateUrl: 'pages/Spotlight/spotlight.html',
      controller: 'spotlightController'
    })
    .when('/upload', {
      templateUrl: 'pages/Upload/upload.html',
      controller: 'uploadController'
    })
    .when('/vote', {
      templateUrl: 'pages/Vote/vote.html',
      controller: 'voteController'
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
  app.controllerProvider = $controllerProvider;
});
