module.exports = function(grunt){
    
    grunt.initConfig({
        
        ts:{
            options:{
                module:'commonjs',
                target:'es5',
                sourceMap:false,
                fast:'never'
            },
            default: {
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
        
        protractor:{
            default:{
                configFile:'protractor.conf.js',
                keepAlive:true,
                noColor:false
            }
        },
        
        connect:{
            options:{
                hostname:'localhost',
                livereload:true
            },
            'unit-test-report':{
                options:{
                    port:8081,
                    base:'./test-results/unit'
                }
            },
            'e2e-test-report':{
                options:{
                    port:8082,
                    base:'./test-results/e2e'
                }
            }
        },
        
        watch:{
            'source':{
                files:[
                    'source/**/*.ts'
                ],
                tasks:['ts']
            },
            'unit-tests':{
                options:{
                    livereload:true
                },
                files:[
                    'build/**/*.js',
                    '!build/e2e-specs/*.js'
                ],
                tasks:['karma:default:run']
            },
            'e2e-tests':{
                options:{
                    livereload:true
                },
                files:[
                    'build/**/*.js',
                    '!build/unit-specs/*.js'
                ],
                tasks:['protractor:default:run']
            }
        }
        
    });
    
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-protractor-runner');
    
    grunt.registerTask('default',['ts','watch:source']);
    grunt.registerTask('unit',['karma','connect:unit-test-report','watch:unit-tests']);
    grunt.registerTask('e2e',['protractor','connect:e2e-test-report','watch:e2e-tests']);

};