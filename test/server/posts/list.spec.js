const Q = require('q');

describe('list posts', function () {
    let posts = [
        { title: 'test_title_1', summary: 'test_summary_1', content: 'test_content_1' },
        { title: 'test_title_2', summary: 'test_summary_2', content: 'test_content_2' },
        { title: 'test_title_3', summary: 'test_summary_3', content: 'test_content_3' }
    ];

    before(() => {
        return posts.map(post => {
            return () => { return Q.delay(10).then(() => { _db_.Post.create(post); }); }
        }).reduce(Q.when, Q(null));
    });

    it('should be able to list all posts', () => {
        return request(_server_)
            .get('/api/posts')
            .expect(200)
            .then(response => {
                assert.deepEqual(response.body.map(post => post.title), posts.map(post => post.title));
            });
    });

    describe('should be able to', () => {
        xit('filter using offset and limit', () => { });
        xit('filter blur name', () => { });
        xit('filter use tags', () => { });
        xit('filter use date', () => { });
        xit('sort by view', () => { });

        it('sort by date', () => {
            return request(_server_)
                .get('/api/posts')
                .send({ sort: 'created_at@desc' })
                .expect(200)
                .then(response => {
                    console.log(response.body);
                    assert.deepEqual(response.body.map(post => post.title), posts.map(post => post.title));
                });
        });
    });

    xit('should not list posts that have been deleted', () => { });
});
