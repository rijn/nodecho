'use strict';

// Module dependencies
const glob = require('glob');
const os = require('os');

const compose = require('./compose');

const METHOD_ENUM = ['get', 'post', 'put', 'delete', 'patch'];

function loadRouter (app, root, options) {
    const opt = options || {};

    glob.sync(`${root}/**/*.js`).forEach((file) => {
        const realRoot = os.platform() === 'win32' ? root.replace(/\\/ig, '/') : root;
        const filePath = file.replace(/\.[^.]*$/, '');
        const controller = require(filePath);
        const constPrefix = '/api';
        const urlPrefix = filePath.replace(realRoot, '').replace(/\/index$/, '');
        const methods = Object.keys(controller);

        // Handle options
        const excludeRules = opt.excludeRules || [];
        const rewriteRules = opt.rewriteRules || new Map();

        function applyMethod (name, methodBody) {
            const body = methodBody;
            let modifiedUrl = `${constPrefix}${urlPrefix}${name === 'index' ? '' : `/${name}`}`;
            let middlewares = [];
            let method = 'get';
            let handler;
            let params;

            switch (typeof body) {
            case 'object':
                params = body.params || [];
                middlewares = body.middlewares || [];
                modifiedUrl += `/${params.join('/')}`;
                handler = body.handler;
                method = (body.method || 'get').toLowerCase();
                break;
            case 'function':
                handler = body;
                break;
            default: return;
            }

            if (excludeRules.indexOf(modifiedUrl) !== -1) {
            // Nothing to-do with the excluded rules
            } else if (METHOD_ENUM.indexOf(method) !== -1) {
                if (!handler) throw Error('[express-load-router]: no handler for method: ', method);

                app[method](
                    rewriteRules.has(modifiedUrl)
                        ? rewriteRules.get(modifiedUrl)
                        : modifiedUrl,
                    compose(middlewares, modifiedUrl),
                    handler
                );
            } else {
                throw Error('[load-router]: invalid method: ', method);
            }
        }

        methods.forEach((method) => {
            const methodName = method;
            const methodBody = controller[method];

            if (Array.isArray(methodBody)) {
                methodBody.forEach((m) => {
                    applyMethod(methodName, m);
                });
            } else {
                applyMethod(methodName, methodBody);
            }
        });
    });
}

module.exports = loadRouter;
