const _ = require('lodash');
const Q = require('q');
const models = require('../../models');
const scrypt = require('scrypt');

const errorHandler = require('../../utils/error-handler');
const pass = require('../../utils/pass');
const random = require('../../utils/random');

const schema = require('../../utils/orm-schema')(
    models.User,
    ['salt', 'authority'], {}
);

module.exports = (req, res) => {
    return Q
        .fcall(pass)

        .then(_s => {
            let deferred = Q.defer();
            req.checkBody(schema);
            req.getValidationResult().then(result => {
                if (!result.isEmpty()) {
                    deferred.reject([result.useFirstErrorOnly().array()[0]]);
                } else {
                    deferred.resolve(_.assign(_s,
                        { data: _.pick(req.body, _.keys(schema)) }
                    ));
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
                            { email: _s.data.email }
                        ]
                    }
                })
                .then(user => {
                    if (!user) {
                        deferred.resolve(_s);
                    } else {
                        deferred.reject(['User exists', _s, 409]);
                    }
                });
            return deferred.promise;
        })

        .then(_s => {
            let deferred = Q.defer();
            _s.salt = random(16);
            scrypt
                .kdf(_s.data.password + _s.salt, { N: 2, r: 1, p: 1 })
                .then(result => {
                    deferred.resolve(_.assign(_s, {
                        'hashedPassword': result.toString('base64')
                    }));
                }, err => {
                    deferred.reject([err, _s]);
                });
            return deferred.promise;
        })

        .then(_s => {
            let deferred = Q.defer();
            _s.assembly = _.assign(
                _.pick(_s.data, _.keys(models.User.rawAttributes)),
                {
                    salt: _s.salt,
                    password: _s.hashedPassword
                }
            );
            models.User
                .create(_s.assembly)
                .then(user => {
                    _s.id = user._id_;
                    deferred.resolve(_s);
                });
            return deferred.promise;
        })

        .done(_s => {
            res.status(201).send(_.pick(_s, 'id'));
        }, errorHandler(res));
};
