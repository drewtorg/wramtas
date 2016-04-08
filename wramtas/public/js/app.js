var app = angular.module('wramtasApp', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider, $controllerProvider) {
	$routeProvider
		.when('/', {
			templateUrl : '../partials/home.html',
			controller : 'homeController'
		})
		.when('/about', {
			templateUrl : '../partials/about.html',
			controller : 'aboutController'
		})
		.when('/affiliates', {
			templateUrl : '../partials/affiliates.html',
			controller : 'affiliateController'
		})
		.when('/conference', {
			templateUrl : '../partials/conference.html',
			controller : 'conferenceController'
		})
		.when('/spotlight', {
			templateUrl : '../partials/spotlight.html',
			controller : 'spotlightController'
		})
		.when('/profile', {
			templateUrl : '../partials/profile.html',
			controller : 'profileController'
		})
		.when('/elections', {
			templateUrl : '../partials/election.html',
			controller : 'electionController'
		})
		.when('/donate', {
			templateUrl : '../partials/donate.html',
			controller : 'donateController'
		});

	$locationProvider.html5Mode(true);
	app.controllerProvider = $controllerProvider;
});
