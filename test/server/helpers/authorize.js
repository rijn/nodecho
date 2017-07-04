const Q = require('q');

global._authorize_ = (token, data = {}) => { return _.assign(_.clone(data), token); };

const defaultUserInfo = {
    username: 'test_user',
    password: '123456',
    email: 'test@test.edu'
};

global.dropAndRegisterAndLogin = (userInfo = defaultUserInfo) => {
    return _db_.User
        .sync({ force: true })
        .then(() => {
            return request(_server_)
                .post('/api/users')
                .send(userInfo)
                .expect(201);
        })
        .then(() => {
            return request(_server_)
                .post('/api/tokens')
                .send(userInfo)
                .expect(201);
        })
        .then(response => {
            return response.body;
        });
};

global.registerAndLogin = (userInfo = defaultUserInfo) => {
    return Q(null)
        .then(() => {
            return request(_server_)
                .post('/api/users')
                .send(userInfo)
                .expect(201);
        })
        .then(() => {
            return request(_server_)
                .post('/api/tokens')
                .send(userInfo)
                .expect(201);
        })
        .then(response => {
            return response.body;
        });
};

module.exports = {
    userInfo: defaultUserInfo
};
