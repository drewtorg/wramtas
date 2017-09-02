app.directive('wraVideo', function(
  $sce,
  $filter,
  $location,
  $uibModal,
  authService,
  dateService,
  videoPageService,
  surveyService,
  DATE_OPTIONS,
  TINY_MCE_OPTIONS) {
  return {
    restrict: 'E',
    templateUrl: 'pages/Shared/directives/video/video.html',
    scope: {
      page: '@'
    },
    controller: ['$scope', function($scope) {
      $scope.tinymceOptions = TINY_MCE_OPTIONS;
      $scope.format = DATE_OPTIONS.format;
      $scope.datepickerOptions = DATE_OPTIONS.datepickerOptions;
      $scope.modalOptions = {
        controller: 'SurveyController',
        templateUrl: 'pages/Shared/directives/video/survey/survey.html',
        backdrop: 'static',
        keyboard: false,
        scope: $scope
      };
      $scope.videoPage = {
        inEditMode: false,
        html: '',
        preHtml: '',
        url: '',
        dates: dateService.newUIDates(['openDate', 'closeDate'])
      };
      $scope.tempVideoPage = {
        inEditMode: false,
        html: '',
        preHtml: '',
        url: '',
        dates: dateService.newUIDates(['openDate', 'closeDate'])
      };

      $scope.$on('youtube.player.ended', function () {
        $scope.openSurvey();
      });

      $scope.$on('youtube.player.playing', function () {
        videoPageService.updateIpAddressList($scope.page);
      });

      $scope.loadVideoPage = function() {
        videoPageService.getVideoPage($scope.page).then(function(res) {
          if (res.data) {
            $scope.videoPage.html = res.data.html;
            $scope.videoPage.preHtml = res.data.preHtml;
            $scope.videoPage.url = res.data.url;
            $scope.videoPage.dates = dateService.toUIDateFormat(res.data.dates);
            $scope.videoPage.survey = res.data.survey;
            $scope.videoPage.ipAddresses = res.data.ipAddresses;
          }
          else {
            $location.path('/');
          }
        });
      };

      $scope.loadVideoPage();

      $scope.videoPageOver = function() {
        return Date.now() > $scope.videoPage.dates.closeDate.date;
      };

      $scope.videoPageComing = function() {
        return Date.now() < $scope.videoPage.dates.openDate.date;
      };

      $scope.videoPageInProgress = function() {
        return Date.now() > $scope.videoPage.dates.openDate.date &&
                 !$scope.videoPageOver();
      };

      $scope.displayVideoPage = function() {
        return $scope.master() && !$scope.isVideoPagePast();
      };

      $scope.toggleOpened = function(date) {
        dateService.toggleOpened(date);
      };

      $scope.isAdmin = function() {
        return authService.isAdmin();
      };

      $scope.editVideoPage = function() {
        $scope.tempVideoPage = angular.copy($scope.videoPage);
        $scope.videoPage.inEditMode = true;
      };

      $scope.saveVideoPage = function() {
        $scope.videoPage = angular.copy($scope.tempVideoPage);
        videoPageService.saveVideoPage($scope.page, $scope.videoPage);
        $scope.videoPage.inEditMode = false;
      };

      $scope.undoEdits = function() {
        $scope.tempVideoPage = angular.copy($scope.videoPage);
        $scope.videoPage.inEditMode = false;
      };

      $scope.trustAsHtml = function(string) {
        return $sce.trustAsHtml(string);
      };

      $scope.editSurvey = function() {
        var modalInstance = $uibModal.open($scope.modalOptions);
        modalInstance.result.then(function (result) {
          // remove all responses for questions that have been changed
          for (var i = 0;
               i < Math.min(result.length, $scope.videoPage.survey.length);
               i += 1) {
            if (result[i].question !== $scope.videoPage.survey[i].question ||
                result[i].inputType !== $scope.videoPage.survey[i].inputType) {
              result[i].responses = [];
              result[i].tallies = Array(result[i].validOptions.length).fill(0);
            }
          }
          $scope.videoPage.survey = result;
          videoPageService.saveVideoPage($scope.page, $scope.videoPage);
        }, function() {}); // eslint-disable-line no-empty-function
      };

      $scope.openSurvey = function() {
        $uibModal.open($scope.modalOptions).result
          .then(function() {
            $scope.loadVideoPage();
          }, function() {}); // eslint-disable-line no-empty-function
      };

      $scope.clearVideoCount = function() {
        videoPageService.clearIpAddressList($scope.page);
        $scope.videoPage.ipAddresses = [];
      };
    }]
  };
});
