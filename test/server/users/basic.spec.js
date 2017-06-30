describe('users', function () {
    it('should only has POST method', function () {
        return Promise.all([
            request(_server_)
                .get('/api/user')
                .expect(404),
            request(_server_)
                .put('/api/user')
                .expect(404),
            request(_server_)
                .patch('/api/user')
                .expect(404),
            request(_server_)
                .delete('/api/user')
                .expect(404)
        ]);
    });
});
