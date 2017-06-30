/* jslint no-unuse-var: "off" */

const Q = require('q');

global.request = require('supertest');
global.assert = require('assert');
global._ = require('lodash');

global._server_ = null;
global._db_ = null;

global._authorize_ = (token, data = {}) => { return _.assign(_.clone(data), token); };

before(done => {
    require('../../../server')
        .then(({ db, server }) => {
            var deferred = Q.defer();
            if (!(process.env.NODE_ENV === 'test' && db.sequelize.config.host === 'localhost')) {
                deferred.resolve({ db, server });
            } else {
                db.sequelize
                    .sync({ force: true, logging: false })
                    .then(() => {
                        console.log('Sync successfully.');
                        deferred.resolve({ db, server });
                    })
                    .catch(err => {
                        deferred.reject(err);
                    });
            }
            return deferred.promise;
        })
        .done(({ db, server }) => {
            _db_ = db;
            _server_ = server;
            done();
        }, (err) => {
            console.error(err);
        });
});

after(function () {
    _server_.close();
});
