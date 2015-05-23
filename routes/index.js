var express = require('express');
var markdown = require('markdown-js');
var router = express.Router();
var post = require('../models/posts').post;

/* GET home page. */
router.get(/^(?:[\/]*)([0-9A-Za-z-_]*)$/, function(req, res, next) {
    var pagePost = 10,
        query = {},
        sort = {
            time: -1
        },
        skip = req.params[0] || 0;

    post.find(query).count(function(err, count) {
        if (err) return handleError(err);

        if (skip > Math.ceil(count / pagePost) - 1) {
            skip = Math.ceil(count / pagePost) - 1;
        }

        console.log('skip = ', skip);
        console.log('count = ', count);

        post.find(query).sort(sort).skip(skip * pagePost).limit(pagePost).exec(function(err, data) {
            if (err) return handleError(err);

            data.forEach(
                function(item) {
                    item.excerpt = markdown.makeHtml(item.content);
                    item.href = "/post/" + item.id;
                }
            );
            if (data.length > pagePost) {};
            res.render('index', {
                title: '「潮鳴」',
                router: [],
                copyright: '&copy;&nbsp;Rijn, 2015.',
                poweredby: 'Powered by Node.js',
                excerpt: data,
                newer: skip - 1,
                older: skip < Math.ceil(count / pagePost) - 1 ? Number(skip) + 1 : 0,
            });
        });
    });
});

module.exports = router;
