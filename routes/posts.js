var globals = require('../globals');
var express = require('express');
var router = express.Router();
var markdown = require( "markdown" ).markdown;
var post = require('../models/posts').post;

/* GET post content. */
router.get('/post/:id', function(req, res, next) {
    var query = {
            id: req.params.id
        },
        sort = {
            time: -1
        };
    post.find(query).sort(sort).exec(function(err, data) {
        res.render('post', {
            globals: globals,
            router: [{
                title: data[0].title,
                href: ""
            }],
            post: [{
                title: data[0].title,
                content: markdown.toHTML(data[0].content),
                tags: data[0].tags,
                time: data[0].time,
                views: data[0].views + 1,
            }],
        });

        /* count visitors */
        post.update(query, {
            $set: {
                views: (data[0].views + 1)
            }
        }, function(err) {});
    });
});

module.exports = router;
