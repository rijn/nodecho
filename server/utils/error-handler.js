const _ = require('lodash');

module.exports = function (res) {
    return function (obj) {
        let err = {
            message: 'Undefined',
            _s: null,
            statusCode: 400,
            extra: {}
        };
        if (_.isArray(obj)) {
            err.message = obj[0] || 'Undefined error';
            err._s = obj[1];
            err.statusCode = obj[2] || 400;
            err.extra = obj[3];
        } else {
            err = _.assign(err, obj);
        }
        try {
            err._s.connection.release();
        } catch (e) {}
        if (process.env.NODE_ENV === 'dev') console.log(obj);
        res.status(err.statusCode).send(_.defaults(err.extra, {
            'error': (err.message).toString()
        }));
    };
};
