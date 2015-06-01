var globals = require('../globals');
var express = require('express');
var router = express.Router();
var markdown = require("markdown").markdown;
var post = require('../models/posts').post;

function html_decode(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    return s;
}

/* GET post content. */
router.get('/post/:id', function(req, res, next) {
    if (err) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    } else {
        var query = {
                id: req.params.id
            },
            sort = {
                time: -1
            };
        post.find(query).sort(sort).exec(function(err, data) {
            if (!data.length) {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            } else {
                res.render('post', {
                    globals: globals,
                    router: [{
                        title: data[0].title,
                        href: ""
                    }],
                    post: [{
                        title: data[0].title,
                        content: html_decode(markdown.toHTML(data[0].content)),
                        tags: data[0].tags,
                        time: data[0].time,
                        location: data[0].location,
                        views: data[0].views + 1,
                    }],
                });

                /* count visitors */
                post.update(query, {
                    $set: {
                        views: (data[0].views + 1)
                    }
                }, function(err) {});
            }
        });
    }
});

module.exports = router;
