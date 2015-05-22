var express = require('express');
var markdown = require('markdown-js');
var router = express.Router();
var post = require('../models/posts').post;

/* GET home page. */
router.get('/', function(req, res, next) {
    var query = {},
        sort = {
            time: -1
        };
    post.find(query).sort(sort).exec(function(err, data) {
        console.log(data);
        data.forEach(
            function(item) {
                item.excerpt = markdown.makeHtml(item.content);
                item.href = "/post/" + item.id;
            }
        );
        res.render('index', {
            title: '「潮鳴」',
            router: [],
            copyright: '&copy;&nbsp;Rijn, 2015.',
            poweredby: 'Powered by Node.js',
            excerpt: data,
        });
    });
});

module.exports = router;
