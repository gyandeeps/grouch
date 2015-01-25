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
            option: "version",
            alias: "v",
            type: "Boolean",
            description: "Outputs the version number."
        },
        {
            option: "src",
            alias: "s",
            type: "path::String",
            default: "./src/main",
            description: "Source file location."
        },
        {
            option: "srcTest",
            alias: "t",
            type: "path::String",
            default: "./src/test",
            description: "Test file location"
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
            alias: "c",
            type: "path::String",
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
            option: "coverage",
            type: "Boolean",
            default: "true",
            description: "Code coverage should be done."
        },
        {
            option: "lint",
            type: "Boolean",
            default: "true",
            description: "Lint the Javascript code with eslint."
        },
        {
            option: "browsers",
            alias: "b",
            type: "[String]",
            description: "Run in different browsers using karma."
        }
    ]
});
