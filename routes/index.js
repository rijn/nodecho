var globals = require('../globals');
var express = require('express');
var markdown = require("markdown").markdown;
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
        if (err) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        }

        if (skip > Math.ceil(count / blogPages) - 1) {
            skip = Math.ceil(count / blogPages) - 1;
        }

        console.log('skip = ', skip);
        console.log('count = ', count);

        post.find(query).sort(sort).skip(skip * blogPages).limit(blogPages).exec(function(err, data) {
            if (!data.length) {
                res.render('index', {
                    globals: globals,
                    router: [],
                    excerpt: [],
                    newer: skip - 1,
                    older: skip < Math.ceil(count / blogPages) - 1 ? Number(skip) + 1 : 0,
                });
            } else {
                data.forEach(
                    function(item) {
                        /* process <!--more--> tag */
                        var end = item.content.indexOf('<!--more-->');
                        item.excerpt = markdown.toHTML(end < 0 ? item.content : item.content.substr(0, end));
                        item.excerpt += "<a class=\"a-more\" href=\"/post/" + item.id + "\" >>> MORE</a>";
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
            }
        });
    });
});

module.exports = router;
