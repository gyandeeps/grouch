/**
 * @fileoverview Exposed API for grouch
 * @author Gyandeep Singh
 */

"use strict";

var path = require("path");
var karmaConf = require("./karmaConf");

function karmaRunner(srcFiles, testFiles, mockFiles, browsers){
    var server = require("karma").server;

    karmaConf.setFiles(srcFiles, testFiles, mockFiles);
    if(karmaConf.setBrowsers(browsers)){
        server.start({configFile: path.resolve(__dirname, "./karmaConf.js")}, function(exitCode){
            console.log("Karma run done: " + ((exitCode === 0) ? "Success" : "Failure"));
        });
    }
    else{
        console.warn("No valid browsers available");
    }

}

module.exports = karmaRunner;
