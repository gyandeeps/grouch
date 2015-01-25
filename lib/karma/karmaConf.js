/**
 * @fileoverview Configuration file for Karma
 * @author Gyandeep Singh
 */

"use strict";

var files;
var browsers = [];
var supportedBrowsers = {
    "CHROME": "Chrome",
    "FIREFOX": "Firefox",
    "FF": "Firefox",
    "IE": "IE",
    "IE8": "IE8",
    "IE9": "IE9",
    "IE10": "IE10",
    "IE11": "IE11",
    "INTERNETEXPLORER": "IE",
    "SAFARI": "Safari"
};

module.exports = function(config){
    config.set({
        browsers: browsers,
        basePath: process.cwd(),
        autoWatch: false,
        files: files,
        frameworks: ["jasmine"],
        singleRun: true,
        reporters: ["progress"],
        browserDisconnectTolerance: 1,
        browserNoActivityTimeout: 20000,
        customLaunchers: {
            IE9: {
                base: "IE",
                "x-ua-compatible": "IE=EmulateIE9"
            },
            IE8: {
                base: "IE",
                "x-ua-compatible": "IE=EmulateIE8"
            },
            IE10: {
                base: "IE",
                "x-ua-compatible": "IE=EmulateIE10"
            },
            IE11: {
                base: "IE",
                "x-ua-compatible": "IE=EmulateIE11"
            }
        }
    });
};

module.exports.setFiles = function(srcFiles, testFiles, mockFiles){
    if(!mockFiles){
        mockFiles = [];
    }
    files = [
        "https://code.jquery.com/jquery-1.11.2.min.js",
        "http://sinonjs.org/releases/sinon-server-1.12.2.js"
    ].concat(mockFiles, srcFiles, testFiles);
};

module.exports.setBrowsers = function(browser){
    browsers = [];
    browser.forEach(function(bro){
        if(supportedBrowsers[bro.toUpperCase()]){
            browsers.push(supportedBrowsers[bro.toUpperCase()]);
        }
        else{
            console.warn(bro + " : Not a valid browser name");
        }
    });

    return browsers.length > 0;
};
