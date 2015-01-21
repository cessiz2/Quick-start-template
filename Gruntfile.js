module.exports = function(grunt) {


    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: true
        },
        watch: {
            js: {
                files: ['app/scripts/{,*/}*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            stylesheets: {
                files: 'app/**/*.css',
                tasks: ['stylesheets']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            sass: {
                files: ['app/styles/{,*/}*.{scss,sass}'],
                tasks: ['sass', 'autoprefixer']
            },
        },
        copy: {
            build: {
                cwd: 'app',
                src: ['**'],
                dest: 'dist',
                expand: true
            },
        },
        clean: {
            build: {
                src: ['dist']
            },
            stylesheets: {
                src: ['dist/styles/*.css', '!build/application.min.css']
            },
            scripts: {
                src: ['dist/scripts/*.js', '!dist/application.js']
            },
        },
        autoprefixer: {
            build: {
                expand: true,
                cwd: 'dist',
                src: ['styles/*.css'],
                dest: 'dist'
            }
        },
        uglify: {
            build: {
                files: {
                    'dist/scripts/application.min.js': ['dist/scripts/*.js']
                }
            }
        },
        cssmin: {
            build: {
                files: {
                    'dist/styles/application.min.css': ['dist/styles/*.css']
                }
            }
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'app/scripts/{,*/}*.js',
                '!app/scripts/vendor/*'
            ]
        },

    });

    //load the tasks
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    // Default task(s).

    grunt.registerTask(
        'build',
        'Compiles all of the assets and copies the files to the build directory.', ['clean:build', 'copy',
            'stylesheets', 'scripts'
        ]
    );

    grunt.registerTask(
        'stylesheets',
        'Compiles the stylesheets.', ['autoprefixer', 'cssmin', 'clean:stylesheets']
    );

    grunt.registerTask(
        'scripts',
        'Compiles the JavaScript files.', ['uglify', 'clean:scripts']
    );

    grunt.registerTask('default', 'start the server and preview your app', function(target) {
        grunt.task.run([
            'build',
            'connect:livereload',
            'watch'
        ]);
    });
};
