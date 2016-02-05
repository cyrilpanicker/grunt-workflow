var HtmlReporter = require('protractor-jasmine2-screenshot-reporter');
var path = require('path');

var reporter = new HtmlReporter({
    dest:'./test-results/e2e',
    filename:'index.html',
    cleanDestination: true,
    showSummary:true,
    showConfiguration: false,
    reportTitle: 'E2E Test Report',
    showQuickLinks:true,
    ignoreSkippedSpecs:false,
    reportOnlyFailedSpecs:false,
    captureOnlyFailedSpecs:false,
    pathBuilder:function(currentSpec, suites, browserCapabilities){
        return 'screenshots' + '/'+currentSpec._suite.description 
            + '/'+ currentSpec.description;
    }
});

exports.config = {
    framework: 'jasmine',
    specs:'build/e2e-specs/*.js',
    directConnect:true,
    keepAlive: true,
    capabilities:{
        browserName:'chrome'
    },
    beforeLaunch:function(){
        return new Promise(function(resolve){
            reporter.beforeLaunch(resolve);
        });
    },
    onPrepare:function(){
        jasmine.getEnv().addReporter(reporter);
    },
    afterLaunch:function(exitCode){
        return new Promise(function(resolve){
            reporter.afterLaunch(resolve.bind(this,exitCode));
        });
    }
};