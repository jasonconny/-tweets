module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
         dist: {
             options: {
                 "style" : "expanded",
                 "sourcemap" : "inline",
                 "unixNewlines" : true,
                 "noCache" : true
             },
             files: {
                 'app/_res/css/main.css': 'app/_res/sass/main.scss'
             }
         }
        },
        watch: {
          css: {
              files: '**/*.scss',
              tasks: ['sass'],
              options: {
                  livereload: true
              }
          },
          js: {
              files: '**/*.js',
              options: {
                  livereload: true
              }
          },
          html: {
              files: '**/*.html',
              options: {
                  livereload: true
              }
          }
        },
        targethtml: {
          dev: {
              options: {
                  curlyTags: {
                      environment: 'dev.chachitweets.com',
                      gaid: 'UA-2569982-8'
                  }
              },
              files: {
                  "./dist/index.html" : "./app/index.html"
              }
          },
          prod: {
              options: {
                  curlyTags: {
                      environment: 'www.chachitweets.com',
                      gaid: 'UA-2569982-6'
                  }
              },
              files: {
                  "./dist/index.html" : "./app/index.html"
              }
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-targethtml');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('dev', ['sass', 'targethtml:dev']);
    grunt.registerTask('prod', ['sass', 'targethtml:prod']);
};