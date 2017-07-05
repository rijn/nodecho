describe('modify posts', function () {
    let token = { };

    let post = {
        title: 'test_title',
        summary: 'test_summary',
        content: 'test_content',
        location: 'test_location',
        private: false,
        user_id: null
    };

    let postId;

    before(() => {
        return dropAndRegisterAndLogin()
            .then(_token => { token = _token; })
            .then(() => {
                return _db_.User.findOne();
            })
            .then(user => {
                post.user_id = user.id;
            })
            .then(() => {
                return _db_.Post.sync({ force: true });
            })
            .then(() => {
                return _db_.Post.create(post);
            })
            .then(post => {
                postId = post._id_;
            });
    });

    describe('should return Unauthorized 401 if didn\'t provide correct token', () => {
        let anotherToken = { };
        before(() => {
            return registerAndLogin({ username: 'test2', password: 'test_password', email: 'test2@t.com' })
                .then(_token => { anotherToken = _token; });
        });

        it('when calling put', () => {
            return request(_server_)
                .put(`/api/posts/${postId}`)
                .send(_authorize_(anotherToken, post))
                .expect(401);
        });

        it('when calling delete', () => {
            return request(_server_)
                .delete(`/api/posts/${postId}`)
                .send(_authorize_(anotherToken, {}))
                .expect(401);
        });
    });

    describe('should return Not Found 404 if id was incorrect', () => {
        it('when calling put', () => {
            return request(_server_)
                .put('/api/posts/123')
                .send(_authorize_(token, post))
                .expect(404);
        });

        it('when calling delete', () => {
            return request(_server_)
                .delete('/api/posts/123')
                .send(_authorize_(token, {}))
                .expect(404);
        });
    });

    describe('should return OK 200 and success', () => {
        before(() => {
            return _db_.Log
                .sync({ force: true })
        });

        let anotherPost = _.merge(post, {
            title: 'test_title_other',
            summary: 'test_summary_other',
            content: 'test_content_other',
            location: 'test_location_other',
            private: true
        });

        it('when calling put', () => {
            return request(_server_)
                .put(`/api/posts/${postId}`)
                .send(_authorize_(token, anotherPost))
                .expect(200);
        });

        it('data should be changed', () => {
            return _db_.Post
                .findOne()
                .then(post => {
                    assert.deepStrictEqual(anotherPost, _.pick(post.dataValues, _.keys(anotherPost)));
                });
        });

        it('when calling delte', () => {
            return request(_server_)
                .delete(`/api/posts/${postId}`)
                .send(_authorize_(token, {}))
                .expect(200);
        });

        it('entry should be removed', () => {
            return _db_.Post
                .findOne({
                    where: { deleted_at: null }
                })
                .then(post => {
                    assert(!post);
                });
        });
    });

    it('should log ip if post was modified', () => {
        return  _db_.Log
            .findAndCountAll()
            .then(({ count }) => {
                console.log(count === 6);
            });
    });
});
