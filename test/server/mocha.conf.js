'use strict';

var _ = require('lodash');
var fs = require('fs');

module.exports = function (grunt) {
    var mochaTest = {
        options: {
            reporter: 'spec',
            quiet: false,
            noFail: false,
            clearRequireCache: false,
            require: []
            // reporter: 'list'
        },
        sharedFiles: [
            'test/server/helper/**/*.js'
        ],
        all: {
            src: [
                'test/server/**/*.spec.js'
            ]
        }
    };

    var helperDir = 'test/server/helpers';

    var helpers = fs.readdirSync(
        helperDir
    ).map(file => helperDir + '/' + file);

    _.forEach(mochaTest, test => {
        if (test.src) {
            test.src = helpers.concat(test.src);
        }
    });

    grunt.config.merge({ mochaTest: mochaTest });

    grunt.registerTask('mocha', [ 'env:test', 'mochaTest' ]);
};
