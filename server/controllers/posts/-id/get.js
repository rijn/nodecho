const _ = require('lodash');
const Q = require('q');
const models = require('../../../models');
const errorHandler = require('../../../utils/error-handler');
const pass = require('../../../utils/pass');
const idt = require('../../../utils/idt');
const authority = require('../../../utils/authority');

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
                    _s.post = post;
                    if (!_.has(post, 'User') || !_.has(_s.raw, 'token')) return { post };
                    return [
                        authority,
                        _s => { return { post, p: _s.user_id === post.User.id }; }
                    ].reduce(Q.when, Q(_s));
                })
                .then(({ post, p = false }) => {
                    if (p) return pass;
                    if (post.password && _s.raw.password === post.password) return pass;
                    if (!post.private && !post.password) return pass;

                    deferred.reject(['Unauthorized', _s, 401]);
                    return;
                })
                .then(() => {
                    deferred.resolve(_s);
                });
            return deferred.promise;
        })

        .done(_s => {
            res.status(200).send(_s.result);
        }, errorHandler(res));
};
