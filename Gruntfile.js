module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            "my_target": {
                "files": {
                    'public/javascripts/libs.min.js': [
                        'public/javascripts/retina.min.js',
                    ],
                }
            }
        },
        cssmin: {
            compress: {
                files: {
                    'public/stylesheets/style.min.css': [
                        "public/stylesheets/style.css"
                    ]
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['uglify', 'cssmin']);
}
