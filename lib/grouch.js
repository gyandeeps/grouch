/**
 * @fileoverview Main file
 * @author Gyandeep Singh
 */

"use strict";

var grouch = {};
var fileManager = require("./fileManager");
var jasmineRunner = require("./jasmineRunner");
var eslint = require("./eslintRunner");
var path = require("path");
var suppliedOptions;
var karma = require("./karma/karmaRunner");

/**
 * It will create the file collections before running the tasks
 * @param {Object} options - Parsed options object
 * @returns {void}
 * @public
 */
grouch.run = function(options){
    var fileCollection = {};

    fileCollection.src = options.src;
    fileCollection.srcTest = options.srcTest;
    if(options.mock.length > 0){
        fileCollection.mock = options.mock;
    }
    suppliedOptions = options;
    fileManager.loadFileCollection(fileCollection, options.ignorePath, ".js", runTasks);
};

/**
 * It will run the tasks specified
 * @param {Object} dirCollection - Collection of different types of files
 * @returns {void}
 * @private
 */
function runTasks(dirCollection){
    Object.keys(dirCollection).forEach(function(item){
        dirCollection[item] = dirCollection[item].concat.apply([], dirCollection[item]).reverse();
    });

    if(suppliedOptions.lint){
        eslint(dirCollection.src);
    }
    //Run jasmine test using phantom via gruntjs
    jasmineRunner(dirCollection.src, dirCollection.srcTest, dirCollection.mock, suppliedOptions.coverage, function(){
        console.log("Test Runner: " + path.resolve(process.cwd(), "specRunner.html"));
        if(suppliedOptions.coverage){
            console.log("Code Coverage: " + path.resolve(process.cwd(), "coverage/index.html"));
        }
    });
    //Run karma
    if(suppliedOptions.browsers){
        if(dirCollection.srcTest){// only run karma if test files are present
            karma(dirCollection.src, dirCollection.srcTest, dirCollection.mock, suppliedOptions.browsers);
        }
        else{
            console.warn("No Karma run as no test files present");
        }
    }
}

module.exports = grouch;
