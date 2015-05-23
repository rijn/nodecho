var globals = require('../globals');
var express = require('express');
var router = express.Router();

/* install page. */
router.get('/', function(req, res, next) {
    res.render('install', {
        globals: globals,
        router: [
        {
        	title: "INSTALL",
        	url: "",
        }
        ],
    });
});

module.exports = router;
