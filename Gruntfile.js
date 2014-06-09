module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        files: {
            myJS: ['Gruntfile.js', 'app/js/**/*.js'],
            myLess: ['app/assets/style/**/*.less']
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

        less: {
            bootstrap: {
                options: {
                    paths: ["app/assets/style",'app/bower_components/bootstrap/less']
                },
                files: {
                    "app/assets/style/my-bootstrap.css": "app/assets/style/bootstrap.less"
                }
            },
            site: {
                files: {
                    "app/assets/style/site.css": "app/assets/style/site.less"
                }
            }
        },

        watch: {
            scripts: {
                files: ['<%= files.myJS %>'],
                tasks: ['jshint','karma:unit:run']
            },
            less: {
                files: ['<%= files.myLess %>'],
                tasks: ['less']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('development',['karma:unit:start','watch']);
};