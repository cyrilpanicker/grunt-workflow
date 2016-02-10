module.exports = function(grunt){
    
    grunt.initConfig({
        
        ts:{
            options:{
                module:'commonjs',
                target:'es5',
                sourceMap:false,
                fast:'never'
            },
            // 'client-scripts': {
            //     files:[
            //         {src:['source/client-scripts/**/*.ts'],dest:'client/scripts'}
            //     ]
            // },
            // 'client-unit-tests': {
            //     files:[
            //         {src:['source/client-unit-tests/**/*.ts'],dest:'tests/client-unit'}
            //     ]
            // },
            // 'client-e2e-tests': {
            //     files:[
            //         {src:['source/client-e2e-tests/**/*.ts'],dest:'tests/client-e2e'}
            //     ]
            // }
            'client-scripts':{
                src:[
                    'source/client-scripts/**/*.ts',
                ],
                outDir:'client/scripts'
            },
            'client-unit-tests':{
                src:[
                    'source/client-unit-tests/**/*.ts',
                    '!source/client-scripts/**/*.ts'
                ],
                outDir:'tests/client-unit-tests'
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
            'client':{
                options:{
                    port:8080,
                    base:'./client'
                }
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
                    'source/client-scripts/**/*.ts'
                ],
                tasks:['ts:client-scripts']
            },
            'client':{
                options:{
                    livereload:true
                },
                files:[
                    'client/**/*'
                ]
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
        },
        
        concurrent:{
            'watch-source-client':{
                options:{
                    logConcurrentOutput:true
                },
                tasks:['watch:source','watch:client']
            }
        }
        
    });
    
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-concurrent');
    
    grunt.registerTask('default',['ts:client-unit-tests']);
    // grunt.registerTask('default',['ts:client-scripts','connect:client','concurrent:watch-source-client']);
    grunt.registerTask('unit',['karma','connect:unit-test-report','watch:unit-tests']);
    grunt.registerTask('e2e',['protractor','connect:e2e-test-report','watch:e2e-tests']);

};