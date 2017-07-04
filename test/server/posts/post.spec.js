const Q = require('q');

describe('post posts', function () {
    let token = { };
    before(() => { return dropAndRegisterAndLogin().then(_token => { token = _token; }); });

    let tags = [
        {
            name: 'test_tag_1'
        },
        {
            name: 'test_tag_2'
        }
    ];

    let post = {
        title: 'test_title',
        summary: 'test_summary',
        content: 'test_content',
        password: 'test_password',
        private: false,
        tags: null
    };

    before(() => {
        return Q
            .all(_.map(tags, tag => {
                return request(_server_)
                    .post('/api/tags')
                    .send(_authorize_(token, tag))
                    .expect(201);
            }))
            .then(() => {
                return request(_server_)
                    .get('/api/tags')
                    .expect(200)
                    .then(response => {
                        post.tags = _.map(response.body, tag => tag.id).join(',');
                    });
            });
    });

    describe('should return Unauthorized 401', () => {
        it('if did provide correct token', () => {
            return request(_server_)
                .post('/api/posts')
                .send(post)
                .expect(401);
        });
    });

    describe('should return BR 400', () => {
        it('if title is not valid', () => {
            return request(_server_)
                .post('/api/posts')
                .send(_authorize_(token, _.set(_.clone(post), 'title', null)))
                .expect(400);
        });

        it('if summary is not valid', () => {
            return request(_server_)
                .post('/api/posts')
                .send(_authorize_(token, _.set(_.clone(post), 'summary', null)))
                .expect(400);
        });

        it('if content is not valid', () => {
            return request(_server_)
                .post('/api/posts')
                .send(_authorize_(token, _.set(_.clone(post), 'content', null)))
                .expect(400);
        });
    });

    describe('if call post and success', () => {
        let callPost = () => {
            return request(_server_)
                .post('/api/posts')
                .send(_authorize_(token, post));
        };

        let fetchDb = (id) => {
            return _db_.Post
                .findOne({
                    where: { id },
                    include: [{
                        model: _db_.Tag,
                        through: {
                            model: _db_.ItemTag
                        }
                    }, {
                        model: _db_.User
                    }]
                })
        };

        it('should return Created 201', () => {
            return callPost()
                .expect(201);
        })

        describe('should save correct data into db', () => {
            let data;

            before(() => {
                return callPost()
                    .then(response => {
                        let id = require('../../../server/utils/idt').decode('Post', response.body.id);
                        return fetchDb(id)
                            .then(post => {
                                data = post;
                            });
                    });
            });

            it('post content', () => {
                assert.deepStrictEqual(_.omit(post, 'tags'), _.pick(data.dataValues, _.keys(_.omit(post, 'tags'))));
            });

            it('user', () => {
                assert(data.User.username === require('../helpers/authorize').userInfo.username);
            });

            it('tags', () => {
                let _tags = _.map(tags, tag => tag.name);
                _.each(data.Tags, Tag => { assert(_.includes(_tags, Tag.name)); })
            })
        })
    });
});
