'use strict';

describe('OneTimeNote', function() {
    var $rootScope, $scope, $location, url, httpBackend, ApiUrl, OneTimeNote;

    var App = module('OneTimeNoteApp');

    var note = {
        id: '1234567890abcdef',
        key: '1234567890abcdef'
    };

    beforeEach(App);

    describe('Controller: OneTimeNoteCreateSuccessCtrl', function () {

        beforeEach(inject(function ($httpBackend, $controller, _$location_, _$rootScope_, OneTimeNoteFactory, _ApiUrl_) {
            $scope = _$rootScope_.$new();
            $location = _$location_;
            $rootScope = _$rootScope_;
            httpBackend = $httpBackend;
            OneTimeNote = OneTimeNoteFactory;
            ApiUrl = _ApiUrl_;
            url = ApiUrl + '/note/' + note.id + '/' + note.key;

            $controller('OneTimeNoteCreateSuccessCtrl', { "$scope": $scope });
        }));

        it ('Should have OneTimeNoteCreateSuccessCtrl controller', function() {
            expect(App.OneTimeNoteCreateSuccessCtrl).not.to.equal(null);
        });

        it ('Should redirect to create page', function() {
            expect($location.path()).to.equal('/create');
        });
    });
});