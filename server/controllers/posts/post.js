const models = require('../../models');
const Q = require('q');
const _ = require('lodash');
const errorHandler = require('../../utils/error-handler');
const authority = require('../../utils/authority');
const pass = require('../../utils/pass');

var schema = require('../../utils/orm-schema')(
    models.Post,
    [],
    {
        'tags': {
            optional: true,
            matches: {
                options: ['^[0-9,]*$', 'gi']
            },
            errorMessage: 'Invalid tags'
        }
    }
);

module.exports = (req, res) => {
    return Q
        .fcall(() => { return { raw: req.body }; })
        .then(authority)

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

        // TODO: check tags
        .then(pass)

        .then(_s => {
            var deferred = Q.defer();
            models.Post
                .create(
                    _.assign(
                        _.pick(_s.data, _.keys(models.Post.rawAttributes)),
                        { user_id: _s.user_id }
                    ),
                    {
                        include: [{
                            model: models.Tag,
                            through: {
                                model: models.ItemTag,
                                scope: {
                                    taggable: 'post'
                                }
                            }
                        }, {
                            model: models.User
                        }]
                    }
                )
                .then(post => {
                    return models.Tag
                        .findAll({ where: { id: { $in:
                            (_s.data.tags || '').split(',')
                        } } })
                        .then(tags => {
                            return post
                                .addTags(tags)
                                .then(() => {
                                    _s.id = post._id_;
                                    deferred.resolve(_s);
                                });
                        });
                });
            return deferred.promise;
        })

        .done(_s => {
            res.status(201).send(_.pick(_s, 'id'));
        }, errorHandler(res));
};
