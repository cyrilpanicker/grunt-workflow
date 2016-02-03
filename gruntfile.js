module.exports = function(grunt){
    
    grunt.initConfig({
        
        ts:{
            options:{
                module:'commonjs',
                target:'es5',
                sourceMap:false,
                fast:'never'
            },
            default:{
                files:[
                    {src:['source/**/*.ts'],dest:'build'}
                ]
            }
        },
        
        karma:{
            default:{
                configFile: 'karma.conf.js',
                singleRun: false,
                background:true
            }
        },
        
        connect:{
            default:{
                options:{
                    port:8000,
                    hostname:'localhost',
                    base:'test-results',
                    livereload:10000
                }
            }
        },
        
        watch:{
            options:{
                livereload:10000
            },
            'compile-ts':{
                files:[
                    'source/**/*.ts'
                ],
                tasks:['ts']
            },
            'run-tests':{
                files:[
                    'build/**/*.js'
                ],
                tasks:['karma:default:run']
            },
            'update-results':{
                files:['test-results/index.html']
            }
        }
        
    });
    
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ts');
    
    grunt.registerTask('default',[
        'ts',
        'karma',
        'connect',
        'watch'
    ]);
    
};