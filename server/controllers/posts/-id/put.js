var Q = require('q');
var errorHandler = require('../../../utils/error-handler');
var pass = require('../../../utils/pass');

module.exports = (req, res) => {
    return Q
        .fcall(pass)

        .done(_s => {
            res.status(200).send();
        }, errorHandler(res));
};
