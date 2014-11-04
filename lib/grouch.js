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

/**
 * It will create the file collections before running the tasks
 * @param {Object} options - Parsed options object
 * @returns {undefined}
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
 * @returns {undefined}
 * @private
 */
function runTasks(dirCollection){
    Object.keys(dirCollection).forEach(function(item){
        dirCollection[item] = dirCollection[item].concat.apply([], dirCollection[item]).reverse();
    });

    if(suppliedOptions.lint){
        eslint(dirCollection.src);
    }

    jasmineRunner(dirCollection.src, dirCollection.srcTest, dirCollection.mock, suppliedOptions.coverage, function(){
        console.log("Test Runner: " + path.resolve(process.cwd(), "_SpecRunner.html"));
        if(suppliedOptions.coverage){
            console.log("Code Coverage: " + path.resolve(process.cwd(), "coverage/index.html"));
        }
    });
}

module.exports = grouch;
