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
		.when('/scholarships', {
			templateUrl : '../partials/scholarships.html',
			controller : 'scholarshipsController'
		})
		.when('/spotlight', {
			templateUrl : '../partials/spotlight.html',
			controller : 'spotlightController'
		})
		.when('/profile', {
			templateUrl : '../partials/profile.html',
			controller : 'profileController'
		})
		.when('/candidates', {
			templateUrl : '../partials/candidates.html',
			controller : 'candidateController'
		})
		.when('/nominate', {
			templateUrl : '../partials/nominate.html',
			controller : 'nominateController'
		})
		.when('/donate', {
			templateUrl : '../partials/donate.html',
			controller : 'donateController'
		})
		.otherwise('/');

	$locationProvider.html5Mode(true);
	app.controllerProvider = $controllerProvider;
});
