
var app = angular.module('wramtasApp', ['ngRoute', 'ui.tinymce', 'ngSanitize', 'flow', 'ngCookies']);

app.config(function($routeProvider, $locationProvider, $controllerProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'Home/home.html',
      controller: 'homeController'
    })
    .when('/about', {
      templateUrl: 'About/about.html',
      controller: 'aboutController'
    })
    .when('/affiliates', {
      templateUrl: 'Affiliates/affiliates.html',
      controller: 'affiliatesController'
    })
    .when('/conference', {
      templateUrl: 'Conference/conference.html',
      controller: 'conferenceController'
    })
    .when('/scholarships', {
      templateUrl: 'Scholarships/scholarships.html',
      controller: 'scholarshipsController'
    })
    .when('/spotlight', {
      templateUrl: 'Spotlight/spotlight.html',
      controller: 'spotlightController'
    })
    .when('/profile', {
      templateUrl: 'Profile/profile.html',
      controller: 'profileController'
    })
    .when('/candidates', {
      templateUrl: 'Candidates/candidates.html',
      controller: 'candidatesController'
    })
    .when('/nominate', {
      templateUrl: 'Nominate/nominate.html',
      controller: 'nominateController'
    })
    .when('/donate', {
      templateUrl: 'Donate/donate.html',
      controller: 'donateController'
    })
    .otherwise('/');

  $locationProvider.html5Mode(true);
  app.controllerProvider = $controllerProvider;
});
