const {option} = require('grunt');

module.exports = function (grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        less: {
            development: {
                files: {
                    'dev/styles/main.css':'src/styles/main.less'
                }
            },
            production : {
                options: {
                    compress:true
                }, files: {
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }
        }, 
    uglify: {
        target:{
            files: {
                'dist/scripts/main.min.js' :'src/scripts/main.js'
            }
        }
    }
    })
    // carregando as  bibliotecas do grunt
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // registrando as terefas a serem executadas pelo grunt
    grunt.registerTask('build',['less:production', 'uglify'])
}