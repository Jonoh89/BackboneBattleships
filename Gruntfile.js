module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        files: {
            myJS: ['Gruntfile.js', 'app/js/**/*.js']
        },

        jshint: {
            all: ['<%= files.myJS %>']
        },

        karma: {
            unit: {
                options: {
                    basePath: 'app/',
                    files: ['bower_components/jquery/dist/jquery.js',
                            'bower_components/json2/json2.js',
                            'bower_components/underscore/underscore.js',
                            'bower_components/backbone/backbone.js',
                            'js/models/*.js',
                            'js/collections/*.js',
                            'js/**/*.tests.js'],
                    autoWatch: false,
                    background: true,
                    runnerPort: 9876,
                    browsers: ['Chrome'],
                    plugins : ['karma-chrome-launcher','karma-jasmine'],
                    frameworks: ['jasmine']
                }
            }
        },

        watch: {
            scripts: {
                files: ['<%= files.myJS %>'],
                tasks: ['jshint','karma:unit:run']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('development',['karma:unit:start','watch']);
};