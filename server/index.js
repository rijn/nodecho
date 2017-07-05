console.log('Running under NODE_ENV=' + process.env.NODE_ENV);

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var _ = require('underscore');
var multer = require('multer');
var storage = multer.memoryStorage();
var history = require('connect-history-api-fallback');
var args = process.argv.slice(2);

const app = express();
const http = require('http').Server(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(multer({
    dest: path.join(__dirname, '../uploads'),
    limits: {
        fieldNameSize: 100,
        files: 1,
        fileSize: 1 * 1024 * 1024
    },
    storage: storage
}).any());

// inject validator
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        return msg;
    }
}));

// enable CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

require('./utils/router-loader')(app, path.join(__dirname, 'controllers'), {
    constPrefix: '/api',
    excludeRules: /get|post|put|delete/gi
});

app.use(function (req, res, next) {
    if (_.first(_.without(req.path.split('/'), '')) === 'api') {
        res.status(404).send({
            'error': 'Undefined API'
        });
    } else {
        next();
    }
});

// cast parameter
app.use(history({
    rewrites: [{
        from: /^[a-zA_Z0-9,/]*$/,
        to: '/'
    }]
}));

if (args.indexOf('--vue') > -1) {
    console.log('Injecting Vue Middleware...');
    require('../build/dev-middleware')(app);
} else {
    app.use('/', express.static(path.join(__dirname, '../dist')));
}

app.use('/files', express.static(path.join(__dirname, '../files')));

if (args.indexOf('--livereload') > -1) {
    console.log('Enabling Livereload Service...');
    app.use(require('connect-livereload')({
        port: 35729
    }));
}

var port = process.env.PORT || 8080;

const Q = require('q');

var db = require('./models');

module.exports = Q
    .fcall(() => {
        var deferred = Q.defer();
        db.sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
                deferred.resolve({ db });
            })
            .catch(err => {
                console.error(err);
                deferred.resolve({ db });
            });
        return deferred.promise;
    })
    .then(({ db }) => {
        var deferred = Q.defer();
        db.sequelize
            .sync({ force: false, logging: false })
            .then(() => {
                console.log('Sync successfully.');
                deferred.resolve({ db });
            })
            .catch(err => {
                console.error(err);
                deferred.resolve({ db });
            });
        return deferred.promise;
    })
    .then(({ db }) => {
        var deferred = Q.defer();
        var server = http.listen(port, () => {
            var port = server.address().port;
            console.log('Server is listening on ' + port);
            deferred.resolve({ db, server });
        });
        return deferred.promise;
    });
