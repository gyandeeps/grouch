/**
 * @fileoverview Main cli object
 * @author Gyandeep Singh
 */

"use strict";

var optionator = require("./options");
var grouch = require("./grouch");

/**
 * Executes the grouch based on the options passed in.
 * @param {string|Array|Object} args - The arguments to process.
 * @returns {void}
 */
function execute(args){
    var options = optionator.parse(args);

    if(options.help){
        console.log(optionator.generateHelp());
    }
    else if(options.version){
        console.log("v" + require("../package.json").version);
    }
    else{
        grouch.run(options);
    }
}

module.exports.execute = execute;
