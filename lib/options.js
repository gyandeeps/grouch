/**
 * @fileoverview Options configuration for optionator.
 * @author Gyandeep Singh
 */
"use strict";

var optionator = require("optionator");

module.exports = optionator({
    prepend: "grouch [options]",
    concatRepeatedArrays: true,
    mergeRepeatedObjects: true,
    options: [
        {
            heading: "Options"
        },
        {
            option: "help",
            alias: "h",
            type: "Boolean",
            description: "Show help."
        },
        {
            option: "src",
            alias: "s",
            type: "path::String",
            default: "./main",
            description: "Source file location."
        },
        {
            option: "srcTest",
            alias: "t",
            type: "path::String",
            default: "./tests",
            description: "Test file location"
        },
        {
            option: "dest",
            alias: "d",
            type: "path::String",
            default: "./site",
            description: "Path of the output directory"
        },
        {
            option: "mock",
            alias: "m",
            type: "[path::String]",
            default: "[]",
            description: "Path of the mock files directory"
        },
        {
            option: "config",
            alias: "g",
            type: "path::String",
            default: "./package.json",
            description: "Load configuration data from this file."
        },
        {
            option: "ignorePath",
            alias: "i",
            type: "[path::String]",
            default: "[]",
            description: "Supply a collection of ignore paths."
        },
        {
            option: "codeCoverage",
            alias: "c",
            type: "Boolean",
            default: "true",
            description: "Code coverage should be done."
        }
    ]
});
