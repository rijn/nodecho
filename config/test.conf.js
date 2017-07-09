var merge = require('lodash').merge;
var devConf = require('./dev.conf');

module.exports = merge(devConf, {
    'file': {
        path: path.join(__dirname, '../tmp'),
        mimetype: ['image/gif', 'image/x-png', 'image/pjpeg', 'image/jpg', 'image/jpeg', 'image/png']
    }
});
