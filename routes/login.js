var globals = require('../globals');
var express = require('express');
var router = express.Router();
var crypto = require('crypto');

function encrypt(str, secret) {
    var cipher = crypto.createCipher('aes192', secret);
    var enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
}

function decrypt(str, secret) {
    var decipher = crypto.createDecipher('aes192', secret);
    var dec = decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

router.get("/", function(req, res, next) {
    res.render('admin.login.ejs', {
        globals: globals,
        router: [{
            title: "ADMIN",
            url: "",
        }, {
            title: "LOGIN",
            url: "",
        }],
        thinHeader: true,
    });
});

router.post("/", function(req, res, next) {
    var data = {
        parament: req.param('username'),
        password: req.param('password'),
        route: 'checkLogin',
    }

    if (data.parament == "rijn" && data.password == "abcd1995") {
        var user = {
                'username': data.parament,
                'password': data.password
            }
            //generate cookie
        req.session.regenerate(function() {
            req.session.user = user.username;
            res.redirect('/admin/dashboard');
        });
    } else {
        res.redirect('/login');
    }

});

module.exports = router;
