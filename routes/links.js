var globals = require('../globals');
var express = require('express');
var router = express.Router();

/* install page. */
router.get("/", function(req, res, next) {
    if (req.subdomains[0] != 'links') {
        next();
    } else {
        var collapse = [{
            title: "Roy Chan's Blog",
            description: "中国梦办公室",
            type: "friend",
            href: "https://www.roychan.org/",
            color: "green",
        }, {
            title: "浮生若夢",
            description: ".if | njzhangyifei",
            type: "friend",
            href: "http://www.njzyf.info/",
            color: "green",
        }, {
            title: "卜卜口の猫窝",
            description: "94年生少年",
            type: "friend",
            href: "http://i.mouto.org/",
            color: "green",
        }, {
            title: "<Sadpig>",
            description: "悲猪大大",
            type: "friend",
            href: "http://sadpig1993.com/",
            color: "green",
        }, {
            title: "RGB设计",
            description: "背景音乐好听233",
            type: "friend",
            href: "http://prolicn.com/",
            color: "green",
        }, {
            title: "Tb's Blog",
            description: "He travels fastest who travels alone.",
            type: "friend",
            href: "http://blog.tbis.me/",
            color: "green",
        }];
        collapse.sort(function(a, b) {
            return a.title > b.title ? 1 : -1
        });
        res.render('links', {
            links: collapse,
            globals: globals,
        });
    }
});

module.exports = router;
