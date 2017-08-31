var app = angular.module('wramtasApp', [
   'ngRoute',
   'ngSanitize',
   'ngCookies',
   'angular-filepicker',
   'angular.filter',
   'angularSpinner',
   'pdf',
   'ui.bootstrap',
   'ui.bootstrap.contextMenu',
   'ui.tinymce',
   'youtube-embed'
]);

app.config(function($routeProvider, $locationProvider, $controllerProvider) {
  $routeProvider
    // HARD-CODED PAGES
    .when('/', {
      templateUrl: 'pages/Home/home.html',
      controller: 'homeController'
    })
    .when('/application', {
      templateUrl: 'pages/Application/application.html',
      controller: 'applicationController'
    })
    .when('/candidates', {
      templateUrl: 'pages/Candidates/candidates.html',
      controller: 'candidatesController'
    })
    .when('/election-info', {
      templateUrl: 'pages/ElectionInfo/electionInfo.html',
      controller: 'electionInfoController'
    })
    .when('/nominate', {
      templateUrl: 'pages/Nominate/nominate.html',
      controller: 'nominateController'
    })
    .when('/vote', {
      templateUrl: 'pages/Vote/vote.html',
      controller: 'voteController'
    })
    // DYNAMIC PAGES
    .when('/about/:route', {
      templateUrl: 'pages/About/about.html',
      controller: 'aboutController'
    })
    .when('/blog/:route', {
      templateUrl: 'pages/Blog/blog.html',
      controller: 'blogController'
    })
    .when('/information/:route', {
      templateUrl: 'pages/Information/information.html',
      controller: 'informationController'
    })
    .when('/submission/:route', {
      templateUrl: 'pages/Submission/submission.html',
      controller: 'submissionController'
    })
    .when('/video/:route', {
      templateUrl: 'pages/Video/video.html',
      controller: 'videoController'
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
  app.controllerProvider = $controllerProvider;
});
