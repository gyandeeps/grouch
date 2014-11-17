/**
 * @fileoverview Runs jasmine unit test on set of files
 * @author Gyandeep Singh
 */

"use strict";

var path = require("path");
var grunt = require("grunt");
var cwd = process.cwd();

grunt.task.init = function(){};

//Load specific task functionality
// jump out of tasks subdir, this is a work around,
// reference dicussion on grunt github issue #696
process.chdir(path.join(__dirname, "/.."));
grunt.loadNpmTasks("grunt-contrib-jasmine");
process.chdir(cwd);

/**
 * This function is used to run the available Jasmine unit tests and upon completion perform a callback function
 * @param {String} src - A flag which identifies if the code coverage report should be run.  A value of "OFF" will prevent the code coverage from processing
 * @param {String} srcTest - A flag which identifies if the code coverage report should be run.  A value of "OFF" will prevent the code coverage from processing
 * @param {String} mock - A flag which identifies if the code coverage report should be run.  A value of "OFF" will prevent the code coverage from processing
 * @param {String} activeCodeCoverageState - A flag which identifies if the code coverage report should be run.  A value of "OFF" will prevent the code coverage from processing
 * @param {Function} callback - A callfunction to execute once the Jasmine tasks complete
 * @return {undefined}
 **/
function runJasmineTests(src, srcTest, mock, activeCodeCoverageState, callback){
    var sourceFiles = src;
    var specFiles = srcTest;
    var mockFiles = mock;
    var configObj = {};

    //Generate the configuration object for this Grunt task
    configObj = {
        src: sourceFiles,
        options: {
            specs: specFiles,
            vendor: [
                "https://code.jquery.com/jquery-1.11.2.min.js",
                "http://sinonjs.org/releases/sinon-server-1.12.2.js"
            ],
            helpers: mockFiles,
            outfile: "./specRunner.html",
            keepRunner: true,
            template: require("grunt-template-jasmine-istanbul"),
            templateOptions: {
                coverage: "./coverage/coverage.json",
                report: "./coverage",
                thresholds: {
                    lines: 0,
                    statements: 0,
                    branches: 0,
                    functions: 0
                }
            }
        }
    };

    //Remove the code coverage options of we should not be running the coverage report
    if(!activeCodeCoverageState){
        delete configObj.options.template;
        delete configObj.options.templateOptions;
    }
    grunt.config("jasmine." + "js", configObj);

    //This is a work around to prevent the grunt task from existing the NodeJS process. In next releases Grunt will have an option to setup whether a task failure
    //makes the process to exit
    grunt.registerTask("usetheforce_on", "force the force option on if needed",
        function(){
            if(!grunt.option("force")){
                grunt.config.set("usetheforce_set", true);
                grunt.option("force", true);
            }
        }
    );
    grunt.registerTask("usetheforce_restore", "turn force option off if we have previously set it",
        function(){
            if(grunt.config.get("usetheforce_set")){
                grunt.option("force", false);
            }
        }
    );

    //Register and run out Jasmine task
    grunt.registerTask("jasmineTest", ["usetheforce_on", "jasmine:js"]);
    grunt.tasks(["jasmineTest"], {}, function(){
        if(callback){
            callback();
        }
    });
}

//Export all of the functions which can be called globally
module.exports = runJasmineTests;
