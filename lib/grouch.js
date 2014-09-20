/**
 * @fileoverview Main file
 * @author Gyandeep Singh
 */

"use strict";

var grouch = {};
var fileManager = require("./fileManager");
var jasmineRunner = require("./jasmineRunner");
var path = require("path");
var suppliedOptions;

grouch.run = function(options){
    var fileCollection = {};

    fileCollection.src = options.src;
    fileCollection.srcTest = options.srcTest;
    if(options.mock.length > 0){
        fileCollection.mock = options.mock;
    }
    suppliedOptions = options;
    fileManager.loadFileCollection(fileCollection, options.ignorePath, ".js", grouch.runTasks);
};

grouch.runTasks = function(dirCollection){
    Object.keys(dirCollection).forEach(function(item){
        dirCollection[item] = dirCollection[item].concat.apply([], dirCollection[item]).reverse();
    });

    jasmineRunner(dirCollection.src, dirCollection.srcTest, dirCollection.mock, suppliedOptions.codeCoverage, function(){
        console.log("Test Runner: " + path.resolve(process.cwd(), "_SpecRunner.html"));
        console.log("Code Coverage: " + path.resolve(process.cwd(), "coverage/index.html"));
    });
};

module.exports = grouch;
