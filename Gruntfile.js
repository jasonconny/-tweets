module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['./dist/*', '!./dist/.keep'],
        copy: {
            resources: {
                expand: true,
                cwd: './src/_res/',
                src: ['**/*', '!**/sass/**'],
                dest: './dist/_res/'
            },
            misc: {
                expand: true,
                cwd: './src/',
                src: ['*.php', '*.ico', '*.png', 'robots.txt'],
                dest: './dist/'
            }
        },
        sass: {
            dist: {
                options: {
                    "style" : "expanded",
                    "sourceMap" : true,
                    "unixNewlines" : true,
                    "noCache" : true
                },
                files: {
                    'app/_res/css/main.css': 'src/_res/sass/main.scss'
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
                    "./dist/index.html" : "./src/index.html"
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
                    "./dist/index.html" : "./src/index.html"
                }
            }
        }
    });

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-targethtml');

    var target = grunt.option('target') || 'dev';
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['sass', 'clean', 'targethtml:' + target, 'copy:misc', 'copy:resources']);
};