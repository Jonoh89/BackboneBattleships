module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        files: {
            myJS: ['Gruntfile.js', 'app/js/**/*.js']
        },

        jshint: {
            all: ['<%= files.myJS %>']
        },

        watch: {
            scripts: {
                files: ['<%= files.myJS %>'],
                tasks: ['jshint']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint']);
};