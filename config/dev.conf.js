const merge = require('lodash').merge;
const prodConf = require('./prod.conf');
const path = require('path');

module.exports = merge(prodConf, {
    'db': {
        dialect: 'sqlite',
        storage: './dev.db',
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'nodecho',
        logging: false
    },
    'file': {
        path: path.join(__dirname, '../tmp')
    }
});
