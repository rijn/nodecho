const Q = require('q');

module.exports = function (_s) {
    var deferred = Q.defer();
    deferred.resolve(_s || {});
    return deferred.promise;
};
