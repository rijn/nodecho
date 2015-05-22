var express = require('express');
var router = express.Router();

/* install page. */
router.get('/', function(req, res, next) {
    res.render('install', {
        title: '「潮鳴」',
        router: [
        {
        	title: "INSTALL",
        	url: "",
        }
        ],
        copyright: '&copy;&nbsp;Rijn, 2015.',
        poweredby: 'Powered by Node.js',
    });
});

module.exports = router;
