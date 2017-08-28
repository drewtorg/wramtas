﻿var app = angular.module('wramtasApp', [
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
    .when('/', {
      templateUrl: 'pages/Home/home.html',
      controller: 'homeController'
    })
    .when('/about', {
      templateUrl: 'pages/About/about.html',
      controller: 'aboutController'
    })
    // .when('/affiliates', {
    //   templateUrl: 'pages/Affiliates/affiliates.html',
    //   controller: 'affiliatesController'
    // })
    .when('/application', {
      templateUrl: 'pages/Application/application.html',
      controller: 'applicationController'
    })
    .when('/candidates', {
      templateUrl: 'pages/Candidates/candidates.html',
      controller: 'candidatesController'
    })
    // .when('/conference', {
    //   templateUrl: 'pages/Conference/conference.html',
    //   controller: 'conferenceController'
    // })
    .when('/election-info', {
      templateUrl: 'pages/ElectionInfo/electionInfo.html',
      controller: 'electionInfoController'
    })
    // .when('/grant', {
    //   templateUrl: 'pages/Grant/grant.html',
    //   controller: 'grantController'
    // })
    // .when('/master-class', {
    //   templateUrl: 'pages/MasterClass/masterClass.html',
    //   controller: 'masterClassController'
    // })
    .when('/nominate', {
      templateUrl: 'pages/Nominate/nominate.html',
      controller: 'nominateController'
    })
    // .when('/presentations', {
    //   templateUrl: 'pages/Presentations/presentations.html',
    //   controller: 'presentationsController'
    // })
    // .when('/scholarships', {
    //   templateUrl: 'pages/Scholarships/scholarships.html',
    //   controller: 'scholarshipsController'
    // })
    // .when('/spotlight', {
    //   templateUrl: 'pages/Spotlight/spotlight.html',
    //   controller: 'spotlightController'
    // })
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
