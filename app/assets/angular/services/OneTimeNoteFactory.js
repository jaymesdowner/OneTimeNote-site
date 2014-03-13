(function() {
    'use strict';

    angular.module('OneTimeNoteApp').factory('OneTimeNoteFactory', function($rootScope, $http, ApiUrl) {
        var factory = {
            note: null,

            view: function(note) {
                $http.get(note).
                    success(function(data) {
                        factory.note = data;
                        $rootScope.$broadcast('note.found', data);
                    }).
                    error(function(data) {
                        factory.note = data;
                        $rootScope.$broadcast('note.failed', data);
                    });

            },
            create: function(newNote) {
                $http({ method: 'POST', url: ApiUrl + '/note', data: newNote }).
                    success(function(data) {
                        factory.note = data;
                        $rootScope.$broadcast('note.created', data);
                    }).
                    error(function(data) {
                        factory.note = data;
                        $rootScope.$broadcast('note.failed', data);
                    });
            }
        };

        return factory;
    });
})();