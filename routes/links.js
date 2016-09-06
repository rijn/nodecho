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
        }, {
            title: "纯点菌~Mido",
            description: "二次元症候群患者",
            type: "friend",
            href: "http://imoe.moe/",
            color: "green",
        }, {
            title: "~ZEE~",
            description: "绅士你好",
            type: "friend",
            href: "http://hentai.me/",
            color: "green",
        }, {
            title: "钉子触",
            description: "大触~大触~",
            type: "friend",
            href: "http://dimpurr.com/",
            color: "green",
        },{
            title: "艾克斯の編碼者",
            description: "機巧死月不會碼代碼",
            type: "friend",
            href: "http://xcoder.in/",
            color: "green",
        }
        ,{
            title: "YoungZhao's Blog",
            description: "",
            type: "friend",
            href: "http://blog.xn--9p3a45o.cn/",
            color: "green",
        }
        ,{
            title: "Perfect Freeze!",
            description: "Cee Cirno",
            type: "friend",
            href: "http://blog.cee.moe/",
            color: "green",
        }
        ,{
            title: "Chinalover",
            description: "Hack the world.",
            type: "friend",
            href: "http://blog.nuptzj.cn/",
            color: "green",
        }
        ,{
            title: "Wxy's",
            description: "",
            type: "friend",
            href: "http://blog.wangxiyu.me",
            color: "green",
        }
        ,{
            title: "HorizonBlue",
            description: "",
            type: "friend",
            href: "http://www.forestofhorizon.com/",
            color: "green",
        }

        ];
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
