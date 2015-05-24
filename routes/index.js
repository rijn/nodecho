var globals = require('../globals');
var express = require('express');
var markdown = require('markdown-js');
var router = express.Router();
var post = require('../models/posts').post;

/* GET home page. */
router.get(/^(?:[\/]*)([0-9A-Za-z-_]*)$/, function(req, res, next) {
    var blogPages = globals.blogPages,
        query = {},
        sort = {
            time: -1
        },
        skip = req.params[0] || 0;

    post.find(query).count(function(err, count) {
        if (err) return handleError(err);

        if (skip > Math.ceil(count / blogPages) - 1) {
            skip = Math.ceil(count / blogPages) - 1;
        }

        console.log('skip = ', skip);
        console.log('count = ', count);

        post.find(query).sort(sort).skip(skip * blogPages).limit(blogPages).exec(function(err, data) {
            if (err) return handleError(err);

            data.forEach(
                function(item) {
                    /* process <!--more--> tag */
                    var end = item.content.indexOf('<!--more-->');
                    item.excerpt = markdown.makeHtml(end < 0 ? item.content : item.content.substr(0, end));
                    item.href = "/post/" + item.id;
                }
            );
            if (data.length > blogPages) {};
            res.render('index', {
                globals: globals,
                router: [],
                excerpt: data,
                newer: skip - 1,
                older: skip < Math.ceil(count / blogPages) - 1 ? Number(skip) + 1 : 0,
            });
        });
    });
});

module.exports = router;
