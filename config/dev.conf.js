var merge = require('lodash').merge;
var prodConf = require('./prod.conf');

module.exports = merge(prodConf, {
    'db': {
        dialect: 'sqlite',
        storage: ':memory:',
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'nodecho',
        logging: false
    }
});
