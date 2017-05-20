module.exports = function(grunt) {
	var target = grunt.option('target') || 'dev';
	var character = grunt.option('character');
	var characterLower = character.toLowerCase();
	var description, gaid;

	switch (character) {
		case 'Chachi':
			description = 'Words of wisdom from Fonzie\'s cousin Chachi Arcola.';
			gaid = 'UA-2569982-6';
			break;
		case 'Fonzie':
			description = 'Come on Yolanda what\'s Fonzie Like?';
			gaid = 'UA-2569982-10';
			break;
		default:
			description = 'blah';
			gaid = 'UA-XXXXXXX-XX';
			break;
	}

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ['./dist/*', '!./dist/.keep'],
		copy: {
			js: {
				expand: true,
				cwd: './src/_res/',
				src: ['js/*'],
				dest: './dist/_res/'
			},
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
					'style' : 'expanded',
					'sourceMap' : true,
					'unixNewlines' : true,
					'noCache' : true
				},
				files: {
					'./dist/_res/css/chachi.css' : './src/_res/sass/chachi.scss',
					'./dist/_res/css/fonzie.css' : './src/_res/sass/fonzie.scss'
				}
			}
		},
		watch: {
			options: {
				interval: 300
			},
			css: {
				files: '**/*.scss',
				tasks: ['sass'],
				options: {
					livereload: true
				}
			},
			js: {
				files: '**/*.js',
				tasks: ['copy:js'],
				options: {
					livereload: true
				}
			},
			html: {
				files: '**/*.html',
				tasks: ['targethtml:' + target],
				options: {
					livereload: true
				}
			}
		},
		targethtml: {
			dev: {
				options: {
					curlyTags: {
						character: character,
						characterLower: characterLower,
						description: description,
						environment: characterLower + 'tweets.dev'
					}
				},
				files: {
					'./dist/index.html' : './src/index.html'
				}
			},
			stage: {
				options: {
					curlyTags: {
						character: character,
						characterLower: characterLower,
						description: description,
						environment: 'stage.' + characterLower + 'tweets.com'
					}
				},
				files: {
					'./dist/index.html' : './src/index.html'
				}
			},
			prod: {
				options: {
					curlyTags: {
						character: character,
						characterLower: characterLower,
						description: description,
						environment: 'www.' + characterLower + 'tweets.com',
						gaid: gaid
					}
				},
				files: {
					'./dist/index.html' : './src/index.html'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-targethtml');

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['clean', 'sass', 'targethtml:' + target, 'copy:misc', 'copy:resources']);
};