const Q = require('q');

describe('list files', function () {
    let token = { };
    before(() => { return dropAndRegisterAndLogin().then(_token => { token = _token; }); });

    let anotherToken = { };
    before(() => {
        return registerAndLogin({ username: 'test2', password: 'test_password', email: 'test2@t.com' })
            .then(_token => { anotherToken = _token; });
    });

    let files = [
        { key: 'test_file_1', size: 1, user_id: 1 },
        { key: 'test_file_2', size: 2, user_id: 1 },
        { key: 'test_file_3', size: 3, user_id: 2 }
    ];

    beforeEach(() => {
        return []
            .concat([ () => { return _db_.File.sync({ force: true }); } ])
            .concat(files.map(file => {
                return () => { return Q.delay(10).then(() => { _db_.File.create(file, { include: _db_.User }); }); };
            }))
            .reduce(Q.when, Q(null));
    });

    it('should respond Unauthorized 401 if didn\'t pass token', () => {
        return request(_server_)
            .get('/api/files')
            .expect(401);
    });

    it('should be able to list all files uploaded', () => {
        return request(_server_)
            .get('/api/files')
            .query(token)
            .expect(200)
            .then(response => {
                assert.deepEqual(response.body.map(file => file.title), files.map(file => file.title));
            });
    });

    describe('should be able to', () => {
        it('sort by date', () => {
            return request(_server_)
                .get('/api/files')
                .query(_authorize_(token, { sort: 'created_at@DESC' }))
                .expect(200)
                .then(response => {
                    assert.deepEqual(
                        response.body.map(file => file.title),
                        files.map(file => file.title).reverse()
                    );
                });
        });
    });
});
