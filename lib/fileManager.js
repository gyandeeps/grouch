/**
 * @fileoverview Manages all the file operations
 * @author Gyandeep Singh
 */

"use strict";

var path = require("path");
var nodeDir = require("node-dir");
var minimatch = require("minimatch");
var fs = require("fs");

/**
 * Checks for patter matching on the file path
 * @param {String} filePath - Path of the file
 * @param {String[]} ignorePattern - Collection of ignore patterns
 * @return {Boolean} true if there is a match else false
 * @private
 */
function patternMatching(filePath, ignorePattern){
    return ignorePattern.some(function(pattern){
        return minimatch(filePath, pattern);
    });
}

/**
 * Filters the file collection based on the ignore patterns and
 * @param files
 * @param ignorePattern
 * @param fileType
 * @return {*}
 * @private
 */
function filterFileCollection(files, ignorePattern, fileType){
    if(!fileType){
        fileType = ".js";
    }

    if(typeof ignorePattern === "string"){
        ignorePattern = [ignorePattern];
    }

    return files.filter(function(file){
        if(path.extname(file) === fileType && !patternMatching(file, ignorePattern)){
            return file;
        }
    });
}

/**
 * Load the files from directories
 * @param {String} dir - Path to the directory
 * @param {String | String[]} ignorePattern - Collection of ignore paths
 * @param {String} fileType - Types of files
 * @param {Function} callback - Function to be called after the reading is done.
 * @return {undefined}
 * @public
 */
function loadFiles(dir, ignorePattern, fileType, callback){
    nodeDir.files(path.resolve(process.cwd(), dir), function(err, files){
        if(err){
            throw err;
        }
        else{
            if(callback){
                callback(filterFileCollection(files, ignorePattern, fileType));
            }
        }
    });
}

/**
 * Loads the collection of all the files needed
 * @param {String | String[]} dirCollection - Collection of directories to read
 * @param {String | String[]} ignorePattern - Collection of ignore paths
 * @param {String} fileType - Types of files
 * @param {Function} callback - Function to be called after the reading is done.
 * @return {undefined}
 * @public
 */
function loadFileCollection(dirCollection, ignorePattern, fileType, callback){
    var callCounter = 0;
    var finalDirFileCollection = {};

    if(typeof dirCollection === "string"){
        dirCollection = [dirCollection];
    }

    function updateCollection(key, files){
        if(!finalDirFileCollection[key]){
            finalDirFileCollection[key] = [];
        }
        finalDirFileCollection[key].push(files);
    }

    Object.keys(dirCollection).forEach(function(key){
        var collection = [dirCollection[key]];

        collection = collection.concat.apply([], collection); //flatten the array to single level

        collection.forEach(function(item){
            if(fs.statSync(path.resolve(process.cwd(), item)).isDirectory()){
                callCounter++;
                loadFiles(item, ignorePattern, fileType, function(files){
                    callCounter--;
                    updateCollection(key, files);
                    if(callCounter === 0){
                        callback(finalDirFileCollection);
                    }
                });
            }
            else{
                updateCollection(key, filterFileCollection([path.resolve(process.cwd(), item)], ignorePattern, fileType));
            }
        });
    });
}

module.exports.loadFiles = loadFiles;
module.exports.loadFileCollection = loadFileCollection;
