/**
 * @fileoverview Test file for fileManager.js.
 * @author Gyandeep Singh
 */

"use strict";

var fileManager = require("../lib/fileManager");
var assert = require("chai").assert;
var path = require("path");

describe("File manager ", function(){
    describe("Get loaded files collection", function(){
        it("Loads the files successfully with js extension", function(done){
            fileManager.loadFiles("tests/resources", "", ".js", function(files){
                var expectedFiles = [
                    path.resolve(process.cwd(), "tests/resources/x.js"),
                    path.resolve(process.cwd(), "tests/resources/y.js"),
                    path.resolve(process.cwd(), "tests/resources/dummyFiles/a.js"),
                    path.resolve(process.cwd(), "tests/resources/dummyFiles/b.js")
                ];
                assert.lengthOf(files, 4);
                assert.sameMembers(files, expectedFiles);
                done();
            });
        });

        it("Loads the files successfully with css extension", function(done){
            fileManager.loadFiles("tests/resources", "", ".css", function(files){
                var expectedFiles = [
                    path.resolve(process.cwd(), "tests/resources/dummyFiles/a.css"),
                    path.resolve(process.cwd(), "tests/resources/dummyFiles/b.css")
                ];
                assert.lengthOf(files, 2);
                assert.sameMembers(files, expectedFiles);
                done();
            });
        });

        it("Loads the files successfully with js extension by not supplying file types", function(done){
            fileManager.loadFiles("tests/resources", "", "", function(files){
                var expectedFiles = [
                    path.resolve(process.cwd(), "tests/resources/x.js"),
                    path.resolve(process.cwd(), "tests/resources/y.js"),
                    path.resolve(process.cwd(), "tests/resources/dummyFiles/a.js"),
                    path.resolve(process.cwd(), "tests/resources/dummyFiles/b.js")
                ];
                assert.lengthOf(files, 4);
                assert.sameMembers(files, expectedFiles);
                done();
            });
        });

        it("Loads the files successfully with js extension but ignores files from dummyFiles dir", function(done){
            fileManager.loadFiles("tests/resources", "**/dummyFiles/**", "", function(files){
                var expectedFiles = [
                    path.resolve(process.cwd(), "tests/resources/x.js"),
                    path.resolve(process.cwd(), "tests/resources/y.js")
                ];
                assert.lengthOf(files, 2);
                assert.sameMembers(files, expectedFiles);
                done();
            });
        });

        it("No files should be loaded as everything is been ignored.", function(done){
            fileManager.loadFiles("tests/resources", ["**/dummyFiles/**", "**/**.js"], "", function(files){
                assert.lengthOf(files, 0);
                done();
            });
        });
    });

    describe("Get all the whole project file collection ", function(){
        beforeEach(function(){
            this.fileCollection = {};
            this.fileCollection.src = "tests/resources";
            this.fileCollection.srcTest = "tests/resources";
            this.fileCollection.mock = ["tests/resources/dummyFiles"];
        });

        afterEach(function(){
            this.fileCollection = {};
        });

        it("Load all the file collection", function(done){
            var expectedSrcFiles = [
                path.resolve(process.cwd(), "tests/resources/x.js"),
                path.resolve(process.cwd(), "tests/resources/y.js"),
                path.resolve(process.cwd(), "tests/resources/dummyFiles/a.js"),
                path.resolve(process.cwd(), "tests/resources/dummyFiles/b.js")
            ];
            var expectedMockFiles = [
                path.resolve(process.cwd(), "tests/resources/dummyFiles/a.js"),
                path.resolve(process.cwd(), "tests/resources/dummyFiles/b.js")
            ];
            fileManager.loadFileCollection(this.fileCollection, "", "", function(dirCollection){
                Object.keys(dirCollection).forEach(function(item){//just to flatten the array
                    dirCollection[item] = dirCollection[item].concat.apply([], dirCollection[item]).reverse();
                });
                assert.isNotArray(dirCollection);
                assert.sameMembers(dirCollection.src, expectedSrcFiles);
                assert.sameMembers(dirCollection.srcTest, expectedSrcFiles);
                assert.sameMembers(dirCollection.mock, expectedMockFiles);
                done();
            });
        });

        it("Load all the file collection even with direct file references", function(done){
            var expectedSrcFiles = [
                path.resolve(process.cwd(), "tests/resources/x.js"),
                path.resolve(process.cwd(), "tests/resources/y.js"),
                path.resolve(process.cwd(), "tests/resources/dummyFiles/a.js"),
                path.resolve(process.cwd(), "tests/resources/dummyFiles/b.js")
            ];
            var expectedMocks = [
                path.resolve(process.cwd(), "tests/resources/x.js"),
                path.resolve(process.cwd(), "tests/resources/y.js")
            ];

            this.fileCollection.mock = expectedMocks;

            fileManager.loadFileCollection(this.fileCollection, "", "", function(dirCollection){
                Object.keys(dirCollection).forEach(function(item){//just to flatten the array
                    dirCollection[item] = dirCollection[item].concat.apply([], dirCollection[item]).reverse();
                });
                assert.isNotArray(dirCollection);
                assert.sameMembers(dirCollection.src, expectedSrcFiles);
                assert.sameMembers(dirCollection.srcTest, expectedSrcFiles);
                assert.sameMembers(dirCollection.mock, expectedMocks);
                done();
            });
        });
    });
});
