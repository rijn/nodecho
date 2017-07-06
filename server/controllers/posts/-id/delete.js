const _ = require('lodash');
const Q = require('q');
const errorHandler = require('../../../utils/error-handler');
const models = require('../../../models');
const idt = require('../../../utils/idt');
const authority = require('../../../utils/authority');

const schema = {
    'id': {
        notEmpty: true,
        errorMessage: 'Invalid id'
    }
};

module.exports = (req, res) => {
    return Q
        .fcall(() => { return { raw: req.body }; })
        .then(authority)

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
            let deferred = Q.defer();
            models.Post
                .destroy({
                    where: {
                        id: idt.decode('Post', _s.data.id)
                    }
                })
                .then(affectedRows => {
                    if (affectedRows) {
                        deferred.resolve(_s);
                    } else {
                        deferred.reject('Tag id invalid', _s, 404);
                    }
                });
            return deferred.promise;
        })

        .then(_s => {
            let deferred = Q.defer();
            models.Log
                .create({
                    ip: req.ip,
                    post_id: idt.decode('Post', req.params.id),
                    description: 'delete'
                })
                .then(() => {
                    deferred.resolve(_s);
                });
            return deferred.promise;
        })

        .done(_s => {
            res.status(200).send();
        }, errorHandler(res));
};
