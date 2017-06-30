var Q = require('q');
var _ = require('lodash');
var models = require('../../models');
var errorHandler = require('../../utils/error-handler');
var pass = require('../../utils/pass');

module.exports = (req, res) => {
    return Q
        .fcall(pass)

        .then(_s => {
            var deferred = Q.defer();
            models.Tag
                .all()
                .then(projects => {
                    _s.result = projects || [];
                    deferred.resolve(_s);
                });
            return deferred.promise;
        })

        .done(_s => {
            res.status(200).send(_s.result);
        }, errorHandler(res));
};
