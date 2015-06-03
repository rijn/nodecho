/**
 * nodecho globals variables
 */

globals = {};

/* Blogname shown at top of pages */
globals.blogName = '「潮鳴」';
globals.blogLogo = 'logo.png';
globals.useLogo = true;
globals.description = '';

/* Manogodb name */
globals.db = 'mongodb://@localhost/nodecho';
//globals.db = 'mongodb://nodecho_user:nodecho@localhost/nodecho';

/* Session key */
globals.session_secret = "nodecho";
globals.auth_cookie_name = "nodecho_user";

/* Subscribe button */
globals.subscribe = true;
globals.subscribeTitle = 'Source code on Github';
globals.subscribeHref = 'https://github.com/rijn/nodecho';

/* Info shown at bottom of pages */
globals.copyright = [
    '&copy;&nbsp;Rijn, 2015&nbsp;',
    '<a href="http://blog.rijnx.com/">BLOG</a>',
    '<a href="http://lab.rijnx.com/">LAB</a>',
    '<a href="https://github.com/rijn">GITHUB</a>',
    '<a href="http://links.rijnx.com/">LINKS</a>',
    '<a href="http://cv.rijnx.com/">CV</a>',
].join('&nbsp;&middot;&nbsp;');

globals.poweredby = '<a href="http://www.miitbeian.gov.cn/">苏ICP备15003700号</a>&nbsp;&middot;&nbsp;Powered by Node.js';

/* Blog pages show at most */
globals.blogPages = 10;
globals.enablePostpageBreadcrumb = false;

module.exports = globals;
