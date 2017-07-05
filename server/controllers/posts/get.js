const _ = require('lodash');
const Q = require('q');
const models = require('../../models');
const errorHandler = require('../../utils/error-handler');
const pass = require('../../utils/pass');

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
        .fcall(pass)

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
            models.Post
                .findAll(_.assign(
                    { where: { deleted_at: null } },
                    _.pick(_s.data, ['offset', 'limit']),
                    {
                        attributes: ['id', 'title', 'summary', 'created_at'],
                        include: [{
                            model: models.Tag,
                            through: {
                                model: models.ItemTag,
                                attributes: []
                            },
                            attributes: {
                                include: ['id', 'name']
                            }
                        }, {
                            model: models.User,
                            attributes: ['id', 'username']
                        }]
                    },
                    _s.data.sort ? { order: [_s.data.sort.split('@')] } : {}
                ))
                .then(posts => {
                    _s.result = _.map(
                        posts || [],
                        post => _.defaultsDeep(
                            {
                                id: post._id_,
                                user: {
                                    id: _.get(post.User, '_id_')
                                }
                            },
                            _.assign(
                                {
                                    user: _.get(post.dataValues.User, 'dataValues'),
                                    tags: _.map(post.dataValues.Tags, tag => _.get(tag, 'dataValues'))
                                },
                                _.omit(post.dataValues, 'User', 'Tags')
                            )
                        )
                    );
                    deferred.resolve(_s);
                });
            return deferred.promise;
        })

        .done(_s => {
            res.status(200).send(_s.result);
        }, errorHandler(res));
};
