var models = require('../../models');
var Q = require('q');
var _ = require('lodash');
var errorHandler = require('../../utils/error-handler');
var pass = require('../../utils/pass');

var schema = require('../../utils/orm-schema')(models.Tag, [], {});

module.exports = (req, res) => {
    return Q
        .fcall(pass)

        .then(_s => {
            var deferred = Q.defer();
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
            var deferred = Q.defer();
            _s.assembly = _.assign(
                _.pick(_s.data, _.keys(models.Tag.rawAttributes)), {}
            );
            models.Tag
                .create(_s.assembly)
                .then(() => {
                    deferred.resolve(_s);
                });
            return deferred.promise;
        })

        .done(_s => {
            res.status(201).send();
        }, errorHandler(res));
};
