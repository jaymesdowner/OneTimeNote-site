'use strict';

angular.module('OneTimeNoteApp').controller('OneTimeNoteCreateSuccessCtrl', function($scope, $location, OneTimeNoteFactory) {
    $scope.note = OneTimeNoteFactory.note;

    // Check if note already exists in factory
    if (!$scope.note) {
        $location.path('/create');
    }
});
