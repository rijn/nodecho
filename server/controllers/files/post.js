const _ = require('lodash');
const fs = require('fs');
const Q = require('q');
const models = require('../../models');
const errorHandler = require('../../utils/error-handler');
const authority = require('../../utils/authority');
const random = require('../../utils/random');

const conf = require('../../../config').file;

module.exports = (req, res) => {
    return Q
        .fcall(() => { return { raw: req.body }; })
        .then(authority)

        .then(_s => {
            var deferred = Q.defer();
            _s.file = req.files[0];
            if (_.indexOf(conf.mimetype, _s.file.mimetype.toLowerCase()) === -1) {
                deferred.reject(['Invalid MIMETYPE']);
            } else {
                deferred.resolve(_s);
            }
            return deferred.promise;
        })

        .then(_s => {
            var deferred = Q.defer();
            try {
                if (!fs.existsSync(conf.path)) {
                    fs.mkdir(conf.path);
                }
            } catch (e) {
                deferred.resolve(_s);
            }
            return deferred.promise;
        })

        .then(_s => {
            var deferred = Q.defer();
            _s.key = random(32);
            fs.writeFile(conf.path + '/' + _s.key, _s.file.buffer, err => {
                if (err) {
                    deferred.reject(['Internal error', _s, 500]);
                } else {
                    deferred.resolve(_s);
                }
            });
            return deferred.promise;
        })

        .then(_s => {
            var deferred = Q.defer();
            models.File
                .create(
                    {
                        key: _s.key,
                        size: _s.file.size
                    },
                    { include: [{
                        model: models.User
                    }]}
                )
                .then(() => {
                    deferred.resolve(_s);
                });
            return deferred.promise;
        })

        .done(_s => {
            res.status(201).send(_.pick(_s, 'key'));
        }, errorHandler(res));
};
