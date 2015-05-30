/**
 * nodecho globals variables
 */

globals = {};

/* Blogname shown at top of pages */
globals.blogName = '「潮鳴」';
globals.blogLogo = 'logo.png';
globals.useLogo = true;

globals.subscribe = true;
globals.subscribeTitle = 'Source code on Github';
globals.subscribeHref = 'https://github.com/rijn/nodecho';

/* Info shown at bottom of pages */
globals.copyright = [
	'&copy;&nbsp;Rijn, 2015&nbsp;',
	'<a href="http://blog.pixelnf.com/">BLOG</a>',
	'<a href="http://lab.pixelnfinite.com/">LAB</a>',
	'<a href="https://github.com/rijn">GITHUB</a>',
	'<a href="http://links.pixelnfinite.com/">LINKS</a>',
	'<a href="http://cv.pixelnf.com/">CV</a>',
].join('&nbsp;&middot;&nbsp;');

globals.poweredby = 'Powered by Node.js';

/* Blog pages show at most */
globals.blogPages = 10;

module.exports = globals;
