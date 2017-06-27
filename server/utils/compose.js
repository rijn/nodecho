/**
 * Compose middlewares
 *
 * @param middlewares
 * @param path
 *
 * @returns {Function}
 */
function compose (middlewares, path) {
    if (!Array.isArray(middlewares)) {
        throw new Error(`middlewares ${JSON.stringify(middlewares)} should be an Array of functions.`);
    };

    if (middlewares.length) {
        for (const fn of middlewares) {
            if (typeof fn !== 'function') {
                throw new Error(`middleware ${path} - ${JSON.stringify(fn)} should be a function, ignored.`);
            };
        };
    };

    return (req, res, next) => {
        (function iterate (i, max) {
            if (i === max) return next();
            middlewares[i](req, res, iterate.bind(this, i + 1, max));
        })(0, middlewares.length);
    };
};

module.exports = compose;
