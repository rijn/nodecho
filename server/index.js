console.log('Running under NODE_ENV=' + process.env.NODE_ENV);

var path = require('path');
var loadRouter = require('./utils/router-loader');
var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var _ = require('underscore');
var multer = require('multer');
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
    inMemory: true
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

loadRouter(app, path.join(__dirname, 'controllers'));

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

if (args.indexOf('--livereload') > -1) {
    console.log('Enabling Livereload Service...');
    app.use(require('connect-livereload')({
        port: 35729
    }));
}

var port = process.env.PORT || 8080;

var server = http.listen(port, function () {
    var port = server.address().port;
    console.log('Server is listening on ' + port);
});

module.exports = server;