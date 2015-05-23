var globals = require('../globals');
var express = require('express');
var markdown = require('markdown-js');
var router = express.Router();
var post = require('../models/posts').post;


router.post(/^\/admin\/posts\/([0-9A-Za-z-_]*)$/, function(req, res, next) {
    console.log(req.param('title'));
    var query = {id: req.params[0]},
        sort = {
            time: -1
        };
    post.find(query).sort(sort).exec(function(err, data) {
        data.forEach(
            function(item) {
                item.href = "/admin/posts/" + item.id;
            }
        );
        res.render('admin.posts.edit.ejs', {
            globals: globals,
            router: [{
                title: "ADMIN",
                url: "/admin",
            }, {
                title: "POSTS",
                url: "/admin/posts",
            }, {
                title: data[0].title,
                url: "",
            }],
            notification: "Saved successfully",
            posts: data,
        });
    });
});

router.get(/^\/admin\/([a-z]+)(?:[\/]*)([0-9A-Za-z-_]*)$/, function(req, res, next) {
    console.log(req.param('name'));
    switch (req.params[0]) {
        case "dashboard":
            res.render('admin.dashboard.ejs', {
                globals: globals,
                router: [{
                    title: "ADMIN",
                    url: "",
                }, {
                    title: "DASHBOARD",
                    url: "",
                }],
            });
            break;
        case "posts":
            if (!!req.params[1]) {
                var query = {id: req.params[1]},
                    sort = {
                        time: -1
                    };
                post.find(query).sort(sort).exec(function(err, data) {
                    data.forEach(
                        function(item) {
                            item.href = "/admin/posts/" + item.id;
                        }
                    );
                    res.render('admin.posts.edit.ejs', {
                        globals: globals,
                        router: [{
                            title: "ADMIN",
                            url: "/admin",
                        }, {
                            title: "POSTS",
                            url: "/admin/posts",
                        }, {
                            title: data[0].title,
                            url: "",
                        }],
                        notification: null,
                        posts: data,
                    });
                });
            } else {
                var query = {},
                    sort = {
                        time: -1
                    };
                post.find(query).sort(sort).exec(function(err, data) {
                    data.forEach(
                        function(item) {
                            item.href = "/admin/posts/" + item.id;
                        }
                    );
                    res.render('admin.posts.ejs', {
                        globals: globals,
                        router: [{
                            title: "ADMIN",
                            url: "",
                        }, {
                            title: "POSTS",
                            url: "",
                        }],
                        posts: data,
                    });
                });
            };

            break;
        default:
            break;
    }

});

module.exports = router;
