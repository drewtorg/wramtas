
var app = angular.module('wramtasApp', ['ngRoute', 'ui.tinymce', 'ngSanitize', 'flow', 'ngCookies']);

app.config(function($routeProvider, $locationProvider, $controllerProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home/home.html',
      controller: 'homeController'
    })
    .when('/about', {
      templateUrl: 'about/about.html',
      controller: 'aboutController'
    })
    .when('/affiliates', {
      templateUrl: 'affiliates/affiliates.html',
      controller: 'affiliatesController'
    })
    .when('/conference', {
      templateUrl: 'conference/conference.html',
      controller: 'conferenceController'
    })
    .when('/scholarships', {
      templateUrl: 'scholarships/scholarships.html',
      controller: 'scholarshipsController'
    })
    .when('/spotlight', {
      templateUrl: 'spotlight/spotlight.html',
      controller: 'spotlightController'
    })
    .when('/profile', {
      templateUrl: 'profile/profile.html',
      controller: 'profileController'
    })
    .when('/candidates', {
      templateUrl: 'candidates/candidates.html',
      controller: 'candidatesController'
    })
    .when('/nominate', {
      templateUrl: '../partials/nominate.html',
      controller: 'nominateController'
    })
    .when('/donate', {
      templateUrl: 'donate/donate.html',
      controller: 'donateController'
    })
    .otherwise('/');

  $locationProvider.html5Mode(true);
  app.controllerProvider = $controllerProvider;
});
