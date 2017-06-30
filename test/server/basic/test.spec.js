describe('connectivity', function () {
    it('should response Undefined API', function () {
        return request(_server_)
            .get('/api')
            .expect('Content-Type', /json/)
            .expect(404)
            .then(response => {
                assert(response.body.error, 'Undefined API');
            });
    });
});
