module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            'build/**/*.js'
        ],
        reporters: ['progress','html'],
        port: 9000,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: false,
        htmlReporter:{
            outputDir:'test-results',
            focusOnFailures: true,
            namedFiles: true,
            reportName: 'index',
            pageTitle:'Test Results'
        }
    });
};
