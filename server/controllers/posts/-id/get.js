const _ = require('lodash');
const Q = require('q');
const models = require('../../../models');
const errorHandler = require('../../../utils/error-handler');
const idt = require('../../../utils/idt');
const authority = require('../../../utils/authority');

const Fontmin = require('fontmin');
const path = require('path');
const fontPath = path.join(__dirname, '../../../../font.ttf');

const schema = {
    'id': {
        notEmpty: true,
        errorMessage: 'Invalid id'
    },
    'password': {
        optional: true
    }
};

module.exports = (req, res) => {
    return Q
        .fcall(() => { return { raw: req.query }; })

        .then(_s => {
            let deferred = Q.defer();
            req.checkParams(schema);
            req.getValidationResult().then(result => {
                if (!result.isEmpty()) {
                    deferred.reject([result.useFirstErrorOnly().array()[0]]);
                } else {
                    deferred.resolve(_.assign(_s, { data: _.pick(req.params, _.keys(schema)) }));
                }
            });
            return deferred.promise;
        })

        .then(_s => {
            let deferred = Q.defer();
            models.Post
                .findOne({
                    where: {
                        id: idt.decode('Post', _s.data.id)
                    },
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
                })
                .then(post => {
                    if (!post) {
                        deferred.reject(['Not found', _s, 404]);
                    }
                    return { post };
                })
                .then(({ post = null }) => {
                    if (!post) return { post };
                    if (!_.has(post, 'User') || !_.has(_s.raw, 'token')) return { post };
                    return [
                        authority,
                        _s => { return { post, p: _s.user_id === post.User.id }; }
                    ].reduce(Q.when, Q(_s)).catch(() => {
                        deferred.reject({
                            message: 'Invalid token',
                            _s,
                            statusCode: 400
                        });
                    });
                })
                .then(({ post = null, p = false }) => {
                    if (p || !post) return { post };
                    if (post.password && _s.raw.password === post.password) return { post };
                    if (!post.private && !post.password) return { post };

                    deferred.reject({
                        message: 'Unauthorized',
                        _s,
                        statusCode: 401,
                        extra: {
                            passwordRequired: !post.private,
                            private: post.private
                        }
                    });
                    return {};
                })
                .then(({ post = null }) => {
                    if (!post) return { post };
                    deferred.resolve(_.assign(_s, {
                        post: post ? _.defaultsDeep(
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
                                _.omit(post.dataValues, 'User', 'Tags', 'user_id')
                            )
                        ) : null,
                        post_id: post.id
                    }));
                });
            return deferred.promise;
        })

        .then(_s => {
            let deferred = Q.defer();
            models.Log
                .create({
                    ip: req.ip,
                    post_id: _s.post_id,
                    description: 'get'
                })
                .then(() => {
                    deferred.resolve(_s);
                });
            return deferred.promise;
        })

        .then(_s => {
            let deferred = Q.defer();
            if (_s.post.poem) {
                new Fontmin()
                    .src(fontPath)
                    .use(Fontmin.glyph({
                        text: _s.post.content
                    }))
                    .use(Fontmin.css({
                        fontFamily: 'poem-font',
                        base64: true
                    }))
                    .run((err, files) => {
                        if (err) {
                            console.error(err);
                        }
                        _s.post.font = files[1]._contents.toString();
                        deferred.resolve(_s);
                    });
            } else {
                deferred.resolve(_s);
            }
            return deferred.promise;
        })

        .done(_s => {
            res.status(200).send(_s.post);
        }, errorHandler(res));
};
