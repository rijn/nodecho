const _ = require('lodash');
const Q = require('q');
const models = require('../../models');
const errorHandler = require('../../utils/error-handler');
const authority = require('../../utils/authority');

const schema = {
    'limit': {
        optional: true,
        isInt: true,
        errorMessage: 'Invalid limit'
    },
    'offset': {
        optional: true,
        isInt: true,
        errorMessage: 'Invalid offset'
    },
    'sort': {
        optional: true,
        matches: {
            options: ['^(created_at|view)@(DESC|ASC)$', 'g']
        },
        errorMessage: 'Invalid offset'
    }
};

module.exports = (req, res) => {
    return Q
        .fcall(() => { return { raw: req.query }; })
        .then(authority)

        .then(_s => {
            let deferred = Q.defer();
            req.checkQuery(schema);
            req.getValidationResult().then(result => {
                if (!result.isEmpty()) {
                    deferred.reject([result.useFirstErrorOnly().array()[0]]);
                } else {
                    deferred.resolve(_.assign(_s, { data: _.pick(req.query, _.keys(schema)) }));
                }
            });
            return deferred.promise;
        })

        .then(_s => {
            let deferred = Q.defer();
            models.File
                .findAll(_.assign(
                    {
                        where: { deleted_at: null, user_id: _s.user_id },
                        attributes: ['id', 'key', 'size', 'created_at']
                    },
                    _.pick(_s.data, ['offset', 'limit']),
                    _s.data.sort ? { order: [_s.data.sort.split('@')] } : {}
                ))
                .then(files => {
                    _s.files = _.map(files || [], file => file.dataValues);
                    deferred.resolve(_s);
                });
            return deferred.promise;
        })

        .done(_s => {
            res.status(200).send(_s.files);
        }, errorHandler(res));
};
