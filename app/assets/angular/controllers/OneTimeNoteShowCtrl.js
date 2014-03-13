'use strict';

angular.module('OneTimeNoteApp').controller('OneTimeNoteShowCtrl', function($scope, $routeParams, $location, OneTimeNoteFactory, ApiUrl) {
    $scope.url = ApiUrl + '/note/' + $routeParams.url_id + '/' + $routeParams.key;

    OneTimeNoteFactory.view($scope.url);

    $scope.$on('note.found', function(event, data) {
        $scope.note = data;
    });

    $scope.$on('note.failed', function(event, data) {
        $location.path('/note-not-found')
    });
})