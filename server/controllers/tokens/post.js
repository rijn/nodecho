const _ = require('lodash');
const Q = require('q');
const scrypt = require('scrypt');

const models = require('../../models');
const random = require('../../utils/random');
const pass = require('../../utils/pass');
const errorHandler = require('../../utils/error-handler');

const schema = {
    'username': {
        notEmpty: true,
        errorMessage: 'Invalid username'
    },
    'password': {
        notEmpty: true,
        errorMessage: 'Invalid password'
    }
};

module.exports = (req, res) => {
    return Q
        .fcall(pass)

        .then(_s => {
            let deferred = Q.defer();
            let data = _.extend(
                {
                    username: null,
                    password: null
                },
                req.body
            );
            deferred.resolve({ data });
            return deferred.promise;
        })
        .then(_s => {
            let deferred = Q.defer();
            req.checkBody(schema);
            req.getValidationResult().then(result => {
                if (!result.isEmpty()) {
                    deferred.reject([result.useFirstErrorOnly().array()[0]]);
                } else {
                    deferred.resolve(_s);
                }
            });
            return deferred.promise;
        })

        .then(_s => {
            let deferred = Q.defer();
            models.User
                .findOne({
                    where: {
                        $or: [
                            { username: _s.data.username },
                            { email: _s.data.username }
                        ]
                    }
                })
                .then(user => {
                    if (user) {
                        deferred.resolve(_.extend(_s, { user }));
                    } else {
                        deferred.reject(['User nonexist', _s, 400]);
                    }
                });
            return deferred.promise;
        })

        .then(_s => {
            let deferred = Q.defer();
            scrypt
                .verifyKdf(Buffer.from(_s.user.password, 'base64'), _s.data.password + _s.user.salt)
                .then(result => {
                    if (result) {
                        deferred.resolve(_s);
                    } else {
                        deferred.reject(['Authority failed', _s, 401]);
                    }
                }, err => {
                    deferred.reject([err, _s]);
                });
            return deferred.promise;
        })

        .then(_s => {
            let deferred = Q.defer();
            _s.token = random(32);
            deferred.resolve(_s);
            return deferred.promise;
        })

        .then(_s => {
            let deferred = Q.defer();
            models.Token
                .create({
                    token: _s.token,
                    user_id: _s.user.id
                })
                .then(() => {
                    deferred.resolve(_s);
                });
            return deferred.promise;
        })

        .done(_s => {
            res.status(201).send({
                userid: _s.user._id_,
                token: _s.token
            });
        }, errorHandler(res));
};
