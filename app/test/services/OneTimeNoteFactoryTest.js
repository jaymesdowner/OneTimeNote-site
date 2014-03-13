'use strict';

describe('OneTimeNote', function() {
    var scope, httpBackend, OneTimeNote, BaseUrl;

    var note = {
        id: '1234567890abcdef',
        key: '1234567890abcdef'
    };

    beforeEach(module('OneTimeNoteApp'));

    describe('Factory: OneTimeNoteFactory', function () {

        beforeEach(inject(function ($rootScope, $controller, $httpBackend, OneTimeNoteFactory, ApiUrl) {
            httpBackend = $httpBackend;
            OneTimeNote = OneTimeNoteFactory;
            BaseUrl = ApiUrl;
        }));

        it('Should return note object', function() {
            var url = BaseUrl + '/note/' + note.id + '/' + note.key;

            httpBackend.expectGET(url).respond({ secure_note: "Hello World" });
            OneTimeNote.view(url);
            httpBackend.flush();

            expect(OneTimeNote.note).to.be.an.instanceOf(Object);
            expect(OneTimeNote.note).to.have.ownProperty('secure_note');
        });

        it('Should not return note object', function() {
            var url = BaseUrl + '/note/' + note.id + '/' + note.key;

            httpBackend.expectGET(url).respond();
            OneTimeNote.view(url);
            httpBackend.flush();

            expect(OneTimeNote.note).to.not.be.an.instanceOf(Object);
        });
    });
});