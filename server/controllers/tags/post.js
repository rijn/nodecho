const _ = require('lodash');
const Q = require('q');
const models = require('../../models');

const errorHandler = require('../../utils/error-handler');
const authority = require('../../utils/authority');

const schema = require('../../utils/orm-schema')(models.Tag, [], {});

module.exports = (req, res) => {
    return Q
        .fcall(() => { return { raw: req.body }; })
        .then(authority)

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
