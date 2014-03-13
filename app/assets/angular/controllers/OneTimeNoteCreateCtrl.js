'use strict';

angular.module('OneTimeNoteApp').controller('OneTimeNoteCreateCtrl', function($scope, $http, $location, OneTimeNoteFactory) {
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    $scope.note = null;
3
    $scope.create = function() {
        OneTimeNoteFactory.create($scope.note)
    };

    $scope.$on('note.created', function(event, data) {
        $location.path('/create/success');
    });

    $scope.$on('note.failed', function(event, data) {

        if (!data) {
            data = { message: 'Something went wrong. Please try again later.' };
        }

        $scope.alerts = {
            type: 'warning',
            message: data.message
        }
    });
});