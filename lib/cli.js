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
 * @returns {undefined}
 */
function execute(args){
    var options = optionator.parse(args);

    grouch.run(options);
    console.log(options);
}

module.exports.execute = execute;
