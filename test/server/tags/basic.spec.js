describe('tags', function () {
    let form = {
        username: 'test_user',
        password: '123456',
        email: 'test@test.edu'
    };

    let token = { };

    before(() => {
        return _db_.User
            .sync({ force: true })
            .then(() => {
                return request(_server_)
                    .post('/api/users')
                    .send(form)
                    .expect(201);
            })
            .then(() => {
                return request(_server_)
                    .post('/api/tokens')
                    .send(form)
                    .expect(201)
                    .then(response => {
                        token = response.body;
                    });
            })
    });

    beforeEach(() => {
        return _db_.Tag
            .sync({ force: true })
            .then(() => { return _db_.Tag.create({ name: 'test1' }); });
    });

    it('should be able to list all tags', () => {
        return request(_server_)
            .get('/api/tags')
            .expect(200)
            .then(response => {
                assert.deepStrictEqual(response.body, [ { id: 1, name: 'test1' } ]);
            });
    });

    it('should be able to delete tag', () => {
        return request(_server_)
            .delete('/api/tags/1')
            .send(_authorize_(token))
            .expect(200)
            .then(response => {
            });
    });

    it('should be able add a tag', () => {
        return request(_server_)
            .post('/api/tags')
            .send(_authorize_(token, { name: 'test2' }))
            .expect(201)
            .then(() => {
                return request(_server_)
                    .get('/api/tags')
                    .expect(200)
                    .then(response => {
                        assert.deepStrictEqual(response.body, [
                            { id: 1, name: 'test1' },
                            { id: 2, name: 'test2' }
                        ]);
                    });
            });
    });

    describe('should return Unauthorized 401', () => {
        let fakeToken = _.set(token, 'token', 'fakeToken');
        it('if using wrong token to delete a tag', () => {
            return request(_server_)
                .delete('/api/tags/1')
                .send(_authorize_(fakeToken))
                .expect(401);
        });

        it('if using wrong token to add a tag', () => {
            return request(_server_)
                .post('/api/tags')
                .send(_authorize_(fakeToken, { name: 'test2' }))
                .expect(401);
        });

        it('db should not be modified', () => {
            return request(_server_)
                .get('/api/tags')
                .expect(200)
                .then(response => {
                    assert.deepStrictEqual(response.body, [ { id: 1, name: 'test1' } ]);
                });
        });
    });
});
