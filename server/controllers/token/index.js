var Q = require('q');
// var _ = require('lodash');
// var random = require('../../utils/random');
var errorHandler = require('../../utils/error-handler');

exports.index = {
    method: 'POST',
    handler (req, res) {
        return Q
            .fcall(() => {
                var deferred = Q.defer();
                deferred.resolve({});
                return deferred.promise;
            })
            .done(_s => {
                res.status(200).send(_s.result);
            }, errorHandler(res));
    }
};
