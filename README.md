# nodecho
Just a blog

## Author's blog

[「潮鳴」](http://node.pixelnfinite.com/)

## Environment

* Node.js `v0.12.2`
* npm `2.7.4`
* Mongo

## Quick start

* Clone the repository

`git clone https://github.com/rijn/nodecho.git`

* Install package

`cd nodecho && npm install`

* Set up mongodb

`db.createCollection('posts');`

* Start server

`node ./bin/www`

## Configuration

    /* Blogname shown at top of pages */
    globals.blogName = '「潮鳴」';
    globals.blogLogo = 'logo.png';
    globals.useLogo = true;

    /* Manogodb name */
    globals.db = 'mongodb://@localhost/nodecho';

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
    ].join('&nbsp;&middot;&nbsp;');

    globals.poweredby = 'Powered by Node.js';

    /* Blog pages show at most */
    globals.blogPages = 10;
    globals.enablePostpageBreadcrumb = false;

## Author

`Rijn`