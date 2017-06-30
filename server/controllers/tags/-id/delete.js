var Q = require('q');
var _ = require('lodash');
var models = require('../../../models');
var errorHandler = require('../../../utils/error-handler');
var pass = require('../../../utils/pass');
var authority = require('../../../utils/authority');

module.exports = (req, res) => {
    return Q
        .fcall(() => { return { raw: req.body }; })
        .then(authority)

        .then(_s => {
            var deferred = Q.defer();
            models.Tag
                .destroy({
                    where: {
                        id: req.params.id
                    }
                })
                .then(affectedRows => {
                    if (affectedRows) {
                        deferred.resolve(_s);
                    } else {
                        deferred.reject('Tag id invalid', _s, 404)
                    }
                });
            return deferred.promise;
        })

        .done(_s => {
            res.status(200).send(_s.result);
        }, errorHandler(res));
};
