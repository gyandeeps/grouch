/* global target, find, echo, exec, exit */

"use strict";
/*eslint-disable vars-on-top */
require("shelljs/make");

var eslint = require("eslint").cli;
var nodeCli = require("shelljs-nodecli");
var jsFiles = find("lib/").filter(fileType("js")).join(" ");
var jsTestFiles = find("tests/").filter(fileType("js")).join(" ");
var nodeModules = "./node_modules/";
var mocha = nodeModules + "mocha/bin/_mocha ";
var jsdoc = "jsdoc -c ./conf.json ";
/*eslint-enable vars-on-top */

/**
 * Generates a function that matches files with a particular extension.
 * @param {string} extension The file extension (i.e. "js")
 * @returns {Function} The function to pass into a filter method.
 * @private
 */
function fileType(extension){
    return function(filename){
        return filename.substring(filename.lastIndexOf(".") + 1) === extension;
    };
}

target.test = function(){
    var errors = 0;
    var lastRun;

    target.lint();

    echo("Running Mocha tests");
    lastRun = nodeCli.exec("istanbul", "cover", mocha, "-- -c", jsTestFiles);
    if(lastRun.code !== 0){
        errors++;
    }

    lastRun = nodeCli.exec("istanbul", "check-coverage", "--statement 98 --branch 90 --function 99 --lines 98");
    if(lastRun.code !== 0){
        errors++;
    }

    if(errors){
        exit(1);
    }
};

target.lint = function(){
    var errors = 0;
    var lastRun;

    echo("Validating Makefile.js");
    lastRun = eslint.execute("./Makefile.js");
    if(lastRun !== 0){
        errors++;
    }

    echo("Validating JavaScript files");
    lastRun = eslint.execute(jsFiles);
    if(lastRun !== 0){
        errors++;
    }

    echo("Validating JavaScript test files");
    lastRun = eslint.execute(jsTestFiles);
    if(lastRun !== 0){
        errors++;
    }

    if(errors){
        exit(1);
    }
};

target.docs = function(){
    echo("Generating jsdoc for js files");
    exec(jsdoc + "lib");
};
