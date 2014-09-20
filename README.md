[![NPM version](https://badge.fury.io/js/grouch.svg)](http://badge.fury.io/js/grouch)
[![Build Status](https://travis-ci.org/gyandeeps/grouch.svg?branch=master)](http://travis-ci.org/gyandeeps/grouch)

Grouch
======

Test runner for any front end project.

It runs unit test using `jasmine` and does code coverage using `istanbul`.

##Options

```
Options:
  -h, --help                       Show help.
  -s, --src path::String           Source file location. - default: ./main
  -t, --srcTest path::String       Test file location - default: ./tests
  -d, --dest path::String          Path of the output directory - default: ./site
  -m, --mock [path::String]        Path of the mock files directory - default: []
  -g, --config path::String        Load configuration data from this file. - default: ./package.json
  -i, --ignorePath [path::String]  Supply a collection of ignore paths. - default: []
  -c, --codeCoverage               Code coverage should be done. - default: true
```

##Future

Check out the [Grouch Roadmap](https://github.com/gyandeeps/grouch/wiki/Release-Goals).