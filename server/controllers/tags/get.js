const Q = require('q');
const models = require('../../models');
const errorHandler = require('../../utils/error-handler');
const pass = require('../../utils/pass');

module.exports = (req, res) => {
    return Q
        .fcall(pass)

        .then(_s => {
            let deferred = Q.defer();
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
