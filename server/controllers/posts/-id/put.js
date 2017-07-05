const _ = require('lodash');
const Q = require('q');
const errorHandler = require('../../../utils/error-handler');
const models = require('../../../models');
const idt = require('../../../utils/idt');
const authority = require('../../../utils/authority');

var schema = require('../../../utils/orm-schema')(
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

        .then(_s => {
            let deferred = Q.defer();
            models.Post
                .findOne({
                    where: {
                        id: idt.decode('Post', req.params.id)
                    },
                    include: [ models.User ]
                })
                .then(post => {
                    if (!post) {
                        deferred.reject(['Not fount', _s, 404]);
                    } else if (!post.User || post.User.id !== _s.user_id) {
                        deferred.reject(['Unauthorized', _s, 401]);
                    } else {
                        deferred.resolve(_s);
                    }
                });
            return deferred.promise;
        })

        .then(_s => {
            var deferred = Q.defer();
            models.Post
                .findOne({
                    where: {
                        id: idt.decode('Post', req.params.id)
                    },
                    include: [ models.User ]
                })
                .then(post => {
                    return post.update(_.pick(_s.data, _.keys(models.Post.rawAttributes)))
                        .then(() => post);
                })
                .then(post => {
                    return models.Tag
                        .findAll({ where: { id: { $in:
                            (_s.data.tags || '').split(',')
                        } } })
                        .then(tags => {
                            return post
                                .setTags(tags)
                                .then(() => {
                                    _s.id = post._id_;
                                    deferred.resolve(_s);
                                });
                        });
                });
            return deferred.promise;
        })

        .done(_s => {
            res.status(200).send();
        }, errorHandler(res));
};
