/**
 * @fileoverview Runs eslint on set of files
 * @author Gyandeep Singh
 */

"use strict";

var Eslint = require("eslint").CLIEngine;
var eslintFormatter = require("./eslint/eslintFromatter");
var fs = require("fs");
var path = require("path");

/**
 * Runs eslint task on the files supplied into it.
 * @param {String[]} srcFiles - collection of source files to lint
 * @returns {void}
 */
function runEslint(srcFiles){
    var eslintObj = new Eslint();

    fs.writeFileSync("eslintReport.html", eslintFormatter(eslintObj.executeOnFiles(srcFiles)));
    console.log("Eslint Report: " + path.resolve(process.cwd(), "eslintReport.html"));
}

module.exports = runEslint;
