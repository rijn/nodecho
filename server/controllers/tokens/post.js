var _ = require('lodash');
var Q = require('q');
var scrypt = require('scrypt');

var models = require('../../models');
var random = require('../../utils/random');
var pass = require('../../utils/pass');
var errorHandler = require('../../utils/error-handler');

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
            var deferred = Q.defer();
            var data = _.extend(
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
            var deferred = Q.defer();
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
            var deferred = Q.defer();
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
            var deferred = Q.defer();
            scrypt
                .verifyKdf(Buffer.from(_s.user.password, 'base64'), _s.data.password + _s.user.salt)
                .then(result => {
                    if (result) {
                        deferred.resolve(_s);
                    } else {
                        deferred.reject(['Authority failed', _s, 401]);
                    }
                }, function (err) {
                    deferred.reject([err, _s]);
                });
            return deferred.promise;
        })

        .then(_s => {
            var deferred = Q.defer();
            _s.token = random(32);
            deferred.resolve(_s);
            return deferred.promise;
        })

        .then(_s => {
            var deferred = Q.defer();
            _s.assembly = {
                token: _s.token,
                user: {
                    id: _s.user.id
                }
            };
            models.Token
                .create(_s.assembly)
                .then(() => {
                    deferred.resolve(_s);
                });
            return deferred.promise;
        })

        .done(_s => {
            res.status(200).send(_.pick(_s, 'token'));
        }, errorHandler(res));
};
