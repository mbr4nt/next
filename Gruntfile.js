module.exports = function(grunt) {
    
    // Project configuration.
    grunt.initConfig({
        concat: {
            options: {
                separator: '\r\n/*****************************/\r\n',
            },
            dist: {
                src: [
                    'dependencies/*.js',
                    'content/src/N3xt.js', 
                    'content/src/functions.js', 
                    'content/src/Element.js', 
                    'content/src/Position.js', 
                    'content/src/Group.js', 
                    'content/src/Drawing.js', 
                    'content/src/TestElement.js',
                    'content/src/Material.js',
                    'content/src/textureMaterial.js',
                    'content/src/Geometry.js',
                    'content/src/Studio.js',
                    'content/src/Gunlocke/TypicalZero.js'
                ],
                dest: 'content/n3xt-build.js',
            },
        },
        watch: {
            js: {
                files: ['content/src/*.js', 'dependencies/*.js'],
                tasks: ['concat']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['concat']);

};