/**
 * @fileoverview Runs jasmine unit test on set of files
 * @author Gyandeep Singh
 */

"use strict";

var path = require("path");
var grunt = require("grunt");

//Load specific task functionality
grunt.loadNpmTasks("grunt-contrib-jasmine");

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
        src : sourceFiles,
        options : {
            specs : specFiles,
            vendor : ["https://code.jquery.com/jquery-1.11.1.min.js"],
            helpers : mockFiles,
            //outfile: "./spec.html",
            keepRunner : true,
            template : require("grunt-template-jasmine-istanbul"),
            templateOptions : {
                coverage : "./coverage/coverage.json",
                report : "./coverage",
                thresholds : {
                    lines : 0,
                    statements : 0,
                    branches : 0,
                    functions : 0
                }
            }
        }
    };

    //Remove the code coverage options of we should not be running the coverage report
    if(activeCodeCoverageState && activeCodeCoverageState === "OFF"){
        delete configObj.options.template;
        delete configObj.options.templateOptions;
    }
    else if(typeof activeCodeCoverageState === "function"){
        callback = activeCodeCoverageState;
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
    grunt.tasks(["jasmineTest"], {}, function(a, b){
        if(callback){
            callback();
        }
    });
}

//Export all of the functions which can be called globally
module.exports = runJasmineTests;
