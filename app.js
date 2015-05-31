var globals = require('./globals');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var markdown = require("markdown").markdown;
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

//mongoose.connect('mongodb://@localhost/nodecho');
mongoose.connect(globals.db);

var cv = require('./routes/cv');

var index = require('./routes/index');
var install = require('./routes/install');
var posts = require('./routes/posts');
var login = require('./routes/login');
var admin = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());
app.use(session({
    secret: globals.session_secret,
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
        url: globals.db,
    }),
}));
app.use(require('./controllers/auth_cookie'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/install', install);

app.use('/login', login);

app.use(cv);
app.use(index);
app.use(posts);

app.use(admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            globals: globals,
            router: [{
                title: "ERROR",
                url: "",
            }],
        });
    });
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        globals: globals,
        router: [{
            title: "ERROR",
            url: "",
        }],
    });
});


module.exports = app;
