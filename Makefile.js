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

function release(type){
    exec("echo Bumping up the version");
    exec("npm version " + type);

    exec("echo Commiting master with tags");
    exec("git add package.json");
    exec("git commit --amend --no-edit");
    exec("git push origin --tags");

    exec("echo Publish on NPM");
    exec("npm publish");

    exec("echo Operation done.");
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

target.patch = function(){
    release("patch");
};

target.minor = function(){
    release("minor");
};

target.major = function(){
    release("major");
};
