(function() {
    'use strict';

    angular.module('OneTimeNoteApp', ['ngRoute', 'ngSanitize', 'angular-medium-editor'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.
                when('/', { templateUrl: 'assets/angular/views/welcome.html', controller: 'OneTimeNoteWelcomeCtrl' }).
                when('/create', { templateUrl: 'assets/angular/views/create.html', controller: 'OneTimeNoteCreateCtrl' }).
                when('/create/success', { templateUrl: 'assets/angular/views/create-success.html', controller: 'OneTimeNoteCreateSuccessCtrl' }).
                when('/note/:url_id/:key', { templateUrl: 'assets/angular/views/note.html', controller: 'OneTimeNoteShowCtrl' }).
                when('/note-not-found', { templateUrl: 'assets/angular/views/note-not-found.html', controller: 'OneTimeNoteNotFoundCtrl' }).
                otherwise({ redirectTo: '/' });
        }
        ])
        .constant('ApiUrl', 'http://onetimenote.pathsofdesign.com')
})();