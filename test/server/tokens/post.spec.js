describe('tokens', function () {
    let form = {
        username: 'test_user',
        password: '123456',
        email: 'test@test.edu'
    };

    before((done) => {
        _db_.User
            .sync({ force: true })
            .then(() => {
                request(_server_)
                    .post('/api/users')
                    .send(form)
                    .expect(200)
                    .then(() => {
                        done();
                    });
            });
    });

    describe('should response br 400', () => {
        it('if user nonexist', () => {
            return request(_server_)
                .post('/api/tokens')
                .send(_.assign(_.clone(form), { username: 'test_user_' }))
                .expect(400)
                .then(response => {
                    assert(response.body.error === 'User nonexist');
                });
        });
    });

    describe('should response Unauthorized 401', () => {
        it('if password incorrect', () => {
            return request(_server_)
                .post('/api/tokens')
                .send(_.assign(_.clone(form), { password: '1234567' }))
                .expect(401)
                .then(response => {
                    assert(response.body.error === 'Authority failed');
                });
        });
    });

    it('should get a valid token if provide correct info', () => {
        return request(_server_)
            .post('/api/tokens')
            .send(form)
            .expect(200)
            .then(response => {
                assert(response.body.token.match(/^([a-zA-Z0-9]){32}$/));
            });
    });

    xit('should be random during multiple login', () => { });

    xit('should be removed if expire', () => { });
});
