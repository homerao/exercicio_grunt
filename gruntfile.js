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
        }, replace: {
            dev: {
                 options: {
                 patterns:[
                {
                    match: 'ENDERECO_DO_CSS',
                    replacement: './styles/main.css'
                },
                {
                    match: 'ENDERECO_DO_JS',
                    replacement: '../src/scripts/main.js'
                }
            ]}, 
            files: [
                {
                    expand: true,
                    flatten: true,
                    src:['src/index.html'],
                    dest: 'dev/'
                }
            ]
            
        }, 
        dist: {
            options: {
            patterns:[
           {
               match: 'ENDERECO_DO_CSS',
               replacement: './styles/main.min.css'
           },
           {
            match: 'ENDERECO_DO_JS',
            replacement: './scripts/main.min.js'
        }
       ]}, 
       files: [
           {
               expand: true,
               flatten: true,
               src:['pre-build/index.html'],
               dest: 'dist/'
           }
       ]
       
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
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // registrando as terefas a serem executadas pelo grunt
    grunt.registerTask('build',['less:production','htmlmin:dist','replace:dev', 'replace:dist', 'uglify'])
}