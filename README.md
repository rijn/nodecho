# nodecho [![Build Status](https://travis-ci.org/rijn/nodecho.svg?branch=master)](https://travis-ci.org/rijn/nodecho)

> Just a blog

## Demo

[「秋桜」](https://blog.rijnx.com/)

## Screenshots

![Screenshot#1](https://github.com/rijn/nodecho/raw/master/screenshots/1.jpg)
![Screenshot#2](https://github.com/rijn/nodecho/raw/master/screenshots/2.jpg)
![Screenshot#3](https://github.com/rijn/nodecho/raw/master/screenshots/3.jpg)
![Screenshot#4](https://github.com/rijn/nodecho/raw/master/screenshots/4.jpg)

## Install

1. Clone this repo

    ```
    git clone https://github.com/rijn/nodecho.git blog
    ```

2. Put the following config into `config/prod.conf.js`. The project is using [sequelize.js](http://docs.sequelizejs.com/manual/installation/getting-started.html#installation) which support `PG`, `MySQL`, `MsSQL` and `Sqlite`.

    ```
    const path = require('path');

    module.exports = {
        'db': {
            dialect: 'mysql',
            host: '',
            port: 3306,
            username: '',
            password: '',
            database: '',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            },
            logging: false,
            define: {
                underscored: true
            }
        },
        'file': {
            path: path.join(__dirname, '../files'),
            mimetype: ['image/gif', 'image/x-png', 'image/pjpeg', 'image/jpg', 'image/jpeg', 'image/png']
        }
    };
    ```

3. Install dependencies and build the vendor.

    ```
    npm i -g grunt grunt-cli
    npm i

    grunt build
    ```

4. Install `PM2` and start the app

    ```
    npm i -g pm2
    pm2 start ./server --name="blog"
    ```

## Dev

```
# running dev server
grunt dev

# running api server spec test
grunt mocha
```

