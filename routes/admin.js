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
            title: '「潮鳴」',
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
            copyright: '&copy;&nbsp;Rijn, 2015.',
            poweredby: 'Powered by Node.js',
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
                title: '「潮鳴」',
                router: [{
                    title: "ADMIN",
                    url: "",
                }, {
                    title: "DASHBOARD",
                    url: "",
                }],
                copyright: '&copy;&nbsp;Rijn, 2015.',
                poweredby: 'Powered by Node.js',
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
                        title: '「潮鳴」',
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
                        copyright: '&copy;&nbsp;Rijn, 2015.',
                        poweredby: 'Powered by Node.js',
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
                        title: '「潮鳴」',
                        router: [{
                            title: "ADMIN",
                            url: "",
                        }, {
                            title: "POSTS",
                            url: "",
                        }],
                        copyright: '&copy;&nbsp;Rijn, 2015.',
                        poweredby: 'Powered by Node.js',
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
