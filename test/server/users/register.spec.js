describe('users register', function () {
    let form = {
        username: 'test_user',
        password: '123456',
        email: 'test@test.edu'
    };

    describe('should response br 400', () => {
        it('if username is invalid', () => {
            return request(_server_)
                .post('/api/users')
                .send(_.assign(_.clone(form), { username: '123' }))
                .expect('Content-Type', /json/)
                .expect(400)
                .then(response => {
                    assert(response.body.error === 'Invalid username');
                });
        });

        it('if password is invalid', () => {
            return request(_server_)
                .post('/api/users')
                .send(_.assign(_.clone(form), { password: '123' }))
                .expect('Content-Type', /json/)
                .expect(400)
                .then(response => {
                    assert(response.body.error === 'Invalid password');
                });
        });

        it('if email is invalid', () => {
            return request(_server_)
                .post('/api/users')
                .send(_.assign(_.clone(form), { email: 'test@com' }))
                .expect('Content-Type', /json/)
                .expect(400)
                .then(response => {
                    assert(response.body.error === 'Invalid email');
                });
        });
    });

    describe('regular registration', () => {
        let userId;

        before((done) => {
            _db_.User
                .sync({ force: true })
                .then(() => {
                    request(_server_)
                        .post('/api/users')
                        .send(form)
                        .expect(200)
                        .then(response => {
                            assert(response.body.id !== '');
                            userId = response.body.id;
                            done();
                        });
                });
        });

        it('should insert into db after post', () => {
            return _db_.User
                .findById(require('../../../server/utils/idt').decode('User', userId))
                .then(user => {
                    assert(user);

                    let value = user.dataValues;
                    _.forEach(['username, email, school'], (key) => {
                        assert(value[key] === form[key]);
                    });
                });
        });
    });

    describe('should response conflict 409', () => {
        before((done) => {
            request(_server_)
                .post('/api/users')
                .send(_.assign(_.clone(form), {
                    username: 'test_user_2',
                    email: 'test2@test.edu'
                }))
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        it('if username exists', (done) => {
            request(_server_)
                .post('/api/users')
                .send(_.assign(_.clone(form), {
                    email: 'test3@test.edu'
                }))
                .expect('Content-Type', /json/)
                .expect(409, done);
        });

        it('if email exists', (done) => {
            request(_server_)
                .post('/api/users')
                .send(_.assign(_.clone(form), {
                    username: 'test_user_3',
                    email: 'test2@test.edu'
                }))
                .expect('Content-Type', /json/)
                .expect(409, done);
        });
    });
});
