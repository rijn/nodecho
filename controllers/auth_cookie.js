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

router.get("/", function (req, res, next) {
    console.log(req.session);
    if (req.session.login) {
        return next();
    } else {
        var cookie = req.cookies[globals.auth_cookie_name];
        if (!cookie) {
            return next();
        }
        var auth_token = decrypt(cookie, globals.session_secret);
        var auth = auth_token.split('\t');
        var user = auth[0], passwd = auth[1];
        var data = {
            parament:user,
            password:passwd,
            route:'checkLogin',
        }
        req.session.login = user.username;
        next();
    }
});

module.exports = router;