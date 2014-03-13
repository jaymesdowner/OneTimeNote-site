'use strict';

describe('OneTimeNote', function() {
    var $rootScope, $scope, $location, url, httpBackend, ApiUrl;

    var note = {
        id: '1234567890abcdef',
        key: '1234567890abcdef'
    };

    var App = module('OneTimeNoteApp');

    beforeEach(App);

    describe('Controller: OneTimeNoteShowCtrl', function () {

        beforeEach(inject(function ($httpBackend, $controller, _$location_, _$rootScope_, OneTimeNoteFactory, _ApiUrl_) {
            $scope = _$rootScope_.$new();
            $location = _$location_;
            $rootScope = _$rootScope_;
            httpBackend = $httpBackend;
            ApiUrl = _ApiUrl_;
            url = ApiUrl + '/note/' + note.id + '/' + note.key;

            $controller('OneTimeNoteShowCtrl', { "$scope": $scope, '$routeParams': { url_id: note.id, key: note.key } });

        }));

        it ('Should have OneTimeNoteShowCtrl controller', function() {
            expect(App.OneTimeNoteShowCtrl).not.to.equal(null);
        });

        it ('Should find note successfully', function() {

            var note = { secure_note: "Hello World" };
            httpBackend.expectGET(url).respond(note);
            httpBackend.flush();

            expect(JSON.stringify($scope.note)).to.equal(JSON.stringify(note));
        });

        it ('Should redirect to note not found', function() {
            httpBackend.expectGET(url).respond(403);
            httpBackend.flush();

            expect($location.path()).to.equal('/note-not-found');
        });
    });
});