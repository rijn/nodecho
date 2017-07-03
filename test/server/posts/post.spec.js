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

    xit('should return Created 201 if call post and success', () => { });
});
