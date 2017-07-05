const Q = require('q');
const fs = require('fs');
const rimraf = require('rimraf');

describe('post files', function () {
    let token = { };
    before(() => { return dropAndRegisterAndLogin().then(_token => { token = _token; }); });

    let path = require('path').join(__dirname, 'images');

    before((done) => {
        let path = require('../../../config').file.path;
        try {
            rimraf(path);
        } finally {
            done();
        }
    });

    describe('should return Unauthorized 401', () => {
        it('if did provide correct token', () => {
            return request(_server_)
                .post('/api/files')
                .attach('file', path + '/test.png')
                .expect(401);
        });
    });

    describe('should return BR 400', () => {
        xit('if file is too large', () => { });

        it('if file has invalid mimetype', () => {
            return request(_server_)
                .post('/api/files')
                .field('userid', token.userid)
                .field('token', token.token)
                .attach('file', path + '/test.ini')
                .expect(400);
        });
    });

    describe('if call post and success', () => {
        let testFiles = ['test.gif', 'test.jpg', 'test.png'];

        it('should return Created 201 and the key', () => {
            return Q.all(testFiles.map(file => {
                return request(_server_)
                    .post('/api/files')
                    .field('userid', token.userid)
                    .field('token', token.token)
                    .attach('file', path + '/' + file)
                    .expect(201);
            }));
        });

        xit('should save the file', () => { });
    });
});
