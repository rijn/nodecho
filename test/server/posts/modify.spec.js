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
                return _db_.User.findOne()
            })
            .then(user => {
                post.user_id = user.id;
            })
            .then(() => {
                return _db_.Post.sync({ force: true })
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

        xit('when calling put', () => {
            return request(_server_)
                .put(`/api/posts/${postId}`)
                .send(_authorize_(anotherToken, {}))
                .expect(401);
        });

        xit('when calling delete', () => {
            return request(_server_)
                .delete(`/api/posts/${postId}`)
                .send(_authorize_(anotherToken, {}))
                .expect(401);
        });
    });

    describe('should return Not Found 404 if id was incorrect', () => {
        xit('when calling put', () => {
            return request(_server_)
                .put(`/api/posts/123`)
                .send(_authorize_(token, {}))
                .expect(404);
        });

        xit('when calling delete', () => {
            return request(_server_)
                .delete(`/api/posts/123`)
                .send(_authorize_(token, {}))
                .expect(404);
        });
    });

    describe('should return OK 200 and success', () => {
        xit('when calling put', () => { });
        xit('when calling delte', () => { });
    });

    xit('should change data after calling put', () => { });

    xit('should delete entry after calling delete', () => { });
});
