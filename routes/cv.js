var globals = require('../globals');
var express = require('express');
var markdown = require("markdown").markdown;
var router = express.Router();
var timeline = require('../models/timeline').timeline;

router.get(/^\/([0-9A-Za-z-_]*)$/, function(req, res, next) {
    /*    if (req.subdomains[0] != 'cv') {
            next();
        } else {
    */
    var query = {},
        sort = {
            id: -1
        };

    timeline.find(query).sort(sort).exec(function(err, data) {
        console.log(err, data);
        if (!err) {
            var nav = [{
                    title: "Overview",
                    active: 0,
                    link: "overview",
                }, {
                    title: "Resume",
                    active: 0,
                    link: "resume",
                }, {
                    title: "Timeline",
                    active: 0,
                    link: "timeline",
                }, {
                    title: "Backpack",
                    active: 0,
                    link: "backpack",
                }, {
                    title: "Find me",
                    active: 0,
                    link: "find",
                }, ],
                link = req.params[0] || "",
                flag = 0,
                timeline = data;
            link = link.toLowerCase();
            if (link == "") {
                link = "overview";
            }
            nav.forEach(
                function(data) {
                    if (data.link == link) {
                        data.active = 1;
                        flag = 1;
                    } else {
                        data.active = 0;
                    }
                }
            );
            if (!flag) {
                nav[0].active = 1;
            }
            res.render('cv.' + link + '.ejs', {
                nav: nav,
                timeline: timeline,
            });
        }
    });

    //   }
});

module.exports = router;
