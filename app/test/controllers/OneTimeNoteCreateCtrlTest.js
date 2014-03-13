'use strict';

describe('OneTimeNote', function() {
    var $rootScope, $scope, $location, url, httpBackend, ApiUrl;

    var note = {
        id: '1234567890abcdef',
        key: '1234567890abcdef'
    };

    var App = module('OneTimeNoteApp');

    beforeEach(App);

    describe('Controller: OneTimeNoteCreateCtrl', function () {

        beforeEach(inject(function ($httpBackend, $controller, _$location_, _$rootScope_, _ApiUrl_) {
            $scope = _$rootScope_.$new();
            $location = _$location_;
            $rootScope = _$rootScope_;
            httpBackend = $httpBackend;
            ApiUrl = _ApiUrl_;
            url = ApiUrl + '/note';

            $controller('OneTimeNoteCreateCtrl', { "$scope": $scope });

        }));

        it ('Should have OneTimeNoteCreateCtrl controller', function() {
            expect(App.OneTimeNoteCreateCtrl).not.to.equal(null);
        });

        it ('Should have note property set as null', function() {
            expect($scope.note).to.equal(null);
        });

        it ('Should set note Property', function() {
            $scope.note = {
                'secure_note': 'test',
                'email': 'email@address.com'
            };

            expect($scope.note).to.equal($scope.note);
        });

        it ('Should create note and redirect path on success', function() {
            httpBackend.expectPOST(url).respond();
            $scope.create();
            httpBackend.flush();

            expect($location.path()).to.equal('/create/success');
        });

        it ('Should set alerts property on failure', function() {
            httpBackend.expectPOST(url).respond(403);
            $scope.create();
            httpBackend.flush();

            expect($scope.alerts).to.have.property('message');
        });
    });
});