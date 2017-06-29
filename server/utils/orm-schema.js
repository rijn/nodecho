const _ = require('lodash');

module.exports = function (orm, exclude, extra) {
    return _.merge(
        _.omit(
            _.mapValues(
                _.pickBy(
                    orm.rawAttributes,
                    (p) => _.has(p, 'validate')
                ),
                (param, key) => _.assign(
                    _.omit(param.validate, 'is'),
                    {
                        errorMessage: 'Invalid ' + key
                    },
                    _.has(param.validate, 'is')
                        ? { matches: { options: param.validate.is } }
                        : {}
                )
            ),
            exclude
        ),
        extra
    );
};
