var app = angular.module('wramtasApp', ['ngRoute', 'ui.tinymce', 'ngSanitize', 'flow', 'ngCookies']);

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
    .when('/conference', {
      templateUrl: 'pages/Conference/conference.html',
      controller: 'conferenceController'
    })
    .when('/scholarships', {
      templateUrl: 'pages/Scholarships/scholarships.html',
      controller: 'scholarshipsController'
    })
    .when('/spotlight', {
      templateUrl: 'pages/Spotlight/spotlight.html',
      controller: 'spotlightController'
    })
    .when('/profile', {
      templateUrl: 'pages/Profile/profile.html',
      controller: 'profileController'
    })
    .when('/candidates', {
      templateUrl: 'pages/Candidates/candidates.html',
      controller: 'candidatesController'
    })
    .when('/nominate', {
      templateUrl: 'pages/Nominate/nominate.html',
      controller: 'nominateController'
    })
    .when('/donate', {
      templateUrl: 'pages/Donate/donate.html',
      controller: 'donateController'
    })
    .otherwise('/');

  $locationProvider.html5Mode(true);
  app.controllerProvider = $controllerProvider;
});
