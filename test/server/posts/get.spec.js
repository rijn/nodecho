describe('get posts', function () {
    let token = { };
    before(() => { return dropAndRegisterAndLogin().then(_token => { token = _token; }); });

    let anotherToken = { };
    before(() => {
        return registerAndLogin({ username: 'test2', password: 'test_password', email: 'test2@t.com' })
            .then(_token => { anotherToken = _token; });
    });

    let post = {
        title: 'test_title',
        summary: 'test_summary',
        content: 'test_content',
        location: 'test_location',
        private: false,
        user_id: null
    };

    before(() => {
        return _db_.User
            .findOne()
            .then(user => {
                post.user_id = user.id;
            });
    });

    describe('should return Unauthorized 401', () => {
        it('if post is private', () => {
            return _db_.Post
                .create(_.set(_.clone(post), 'private', true))
                .then(post => {
                    return request(_server_)
                        .get(`/api/posts/${post._id_}`)
                        .expect(401);
                });
        });

        it('if post is locked and provide wrong password', () => {
            return _db_.Post
                .create(_.set(_.clone(post), 'password', 'test_password'))
                .then(post => {
                    return request(_server_)
                        .get(`/api/posts/${post._id_}`)
                        .query({ password: 'hhh' })
                        .expect(401);
                });
        });

        it('if post is private then privide incorrect token', () => {
            return _db_.Post
                .create(_.set(_.clone(post), 'private', true), {
                    include: [{
                        model: _db_.User
                    }]
                })
                .then(post => {
                    return request(_server_)
                        .get(`/api/posts/${post._id_}`)
                        .query(_authorize_(anotherToken, {}))
                        .expect(401);
                });
        });

        it('if post is locked then privide incorrect token and incorrect password', () => {
            return _db_.Post
                .create(_.set(_.clone(post), 'password', '1234'), {
                    include: [{
                        model: _db_.User
                    }]
                })
                .then(post => {
                    return request(_server_)
                        .get(`/api/posts/${post._id_}`)
                        .query(_authorize_(anotherToken, { password: '123' }))
                        .expect(401);
                });
        });
    });

    describe('should return OK 200 and correct content', () => {
        it('if post is open', () => {
            return _db_.Post
                .create(post)
                .then(post => {
                    return request(_server_)
                        .get(`/api/posts/${post._id_}`)
                        .expect(200)
                        .then(response => {
                            ['title', 'summary', 'content', 'location'].forEach(key => {
                                assert(response.body[key] === post[key]);
                            });
                            assert(response.body.user.id === token.userid);
                        });
                });
        });

        it('if post is locked but provide correct password', () => {
            let password = 'test_password';

            return _db_.Post
                .create(_.set(_.clone(post), 'password', password))
                .then(post => {
                    return request(_server_)
                        .get(`/api/posts/${post._id_}`)
                        .query({ password })
                        .expect(200);
                });
        });

        it('if post is locked but privide correct token', () => {
            return _db_.Post
                .create(_.set(_.clone(post), 'password', '123'), {
                    include: [{
                        model: _db_.User
                    }]
                })
                .then(post => {
                    return request(_server_)
                        .get(`/api/posts/${post._id_}`)
                        .query(_authorize_(token, {}))
                        .expect(200);
                });
        });

        it('if post is private but provide correct token', () => {
            return _db_.Post
                .create(_.set(_.clone(post), 'private', true), {
                    include: [{
                        model: _db_.User
                    }]
                })
                .then(post => {
                    return request(_server_)
                        .get(`/api/posts/${post._id_}`)
                        .query(_authorize_(token, {}))
                        .expect(200);
                });
        });

        it('if post is locked then privide incorrect token and correct password', () => {
            let password = 'test_password';

            return _db_.Post
                .create(_.set(_.clone(post), 'password', password), {
                    include: [{
                        model: _db_.User
                    }]
                })
                .then(post => {
                    return request(_server_)
                        .get(`/api/posts/${post._id_}`)
                        .query(_authorize_(anotherToken, { password }))
                        .expect(200);
                });
        });
    });

    it('should return Not Found 404 if id is incorrect', () => {
        return _db_.Post
            .create(post)
            .then(post => {
                return request(_server_)
                    .get(`/api/posts/123`)
                    .expect(404);
            });
    });

    xit('should log ip if post was readed', () => { });
});
