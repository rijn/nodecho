const tryRequire = require('tryrequire');
const path = require('path');
const merge = require('lodash').merge;

let prodConf = {};
try {
    prodConf = require('./prod.conf');
} catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
        throw e;
    }
};

module.exports = merge(prodConf, {
    'db': {
        dialect: 'sqlite',
        storage: './dev.db',
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'nodecho',
        logging: false,
        define: {
            underscored: true
        }
    },
    'file': {
        path: path.join(__dirname, '../files'),
        mimetype: ['image/gif', 'image/x-png', 'image/pjpeg', 'image/jpg', 'image/jpeg', 'image/png']
    }
});
