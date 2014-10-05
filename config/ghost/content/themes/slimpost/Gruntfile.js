module.exports = function (grunt) {

    grunt.initConfig({
        clean: {
            sass: ["assets/css/style.css"],
            js: ["src/js/main.js", "assets/js/main.min.js"]
        },
        sass: {
            build: {
                files: [{
                    cwd: 'src/scss',
                    expand: true,
                    src: [ '**/*.scss' ],
                    dest: 'assets/css',
                    ext: '.css'
                }]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 version']
            },
            build: {
                src: 'assets/css/style.css'
            },
        },
        concat: {
            options: {
                separator: ';',
            },
            build: {
                src: ['src/js/**/*.js'],
                dest: 'src/js/main.js'
            }
        },
        uglify: {
            build: {
                src: 'src/js/main.js',
                dest: 'assets/js/main.min.js'
            }
        },
        watch: {
            sass: {
                files: 'src/scss/**/*.scss',
                tasks: ['clean:sass', 'sass', 'autoprefixer'],
            },
            js: {
                files: 'src/js/**/*.js',
                tasks: ['clean:js', 'concat', 'uglify'],
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['clean:sass', 'clean:js', 'sass', 'autoprefixer', 'concat', 'uglify']);
}
