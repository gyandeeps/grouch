[![NPM version](https://badge.fury.io/js/grouch.svg)](http://badge.fury.io/js/grouch)
[![Build Status](https://travis-ci.org/gyandeeps/grouch.svg?branch=master)](http://travis-ci.org/gyandeeps/grouch)

Grouch
======

Test runner for any front end project.

It runs unit test using `jasmine` and does code coverage using `istanbul`.
It also does Javascript lint using [Eslint](http://eslint.org).

##Options

```
Options:
  -h, --help                       Show help.
  -v, --version                    Outputs the version number.
  -s, --src path::String           Source file location. - default: ./src/main
  -t, --srcTest path::String       Test file location - default: ./src/test
  -m, --mock [path::String]        Path of the mock files directory - default: []
  -c, --config path::String        Load configuration data from this file.
  -i, --ignorePath [path::String]  Supply a collection of ignore paths. - default: []
  --coverage                       Code coverage should be done. - default: true
  --lint                           Lint the Javascript code with eslint. - default: true
  -b, --browsers [String]          Run in different browsers using karma.
```

##Usage

The project should be used as CLI tool so that's why we require it to be installed globally.
The benefits for installing it at globally are:

* Don't have to install inside each project
* Is available as a executable on your path
* You can use it on any project without any installation. Its like a software on your machine.

To install it at global level, open cmd and run this command

```.sh
npm install -g grouch
```

If already installed use the following command to update it

```.sh
npm update -g grouch
```

Now in your cmd window, you should be able to say

```.sh
grouch -h
```

and it should display help i.e. all the options available. it would look similar to what you see under the options header on the top.

If you want to test your code

```.sh
grouch -s src/main/js -t test/js -m test/mock1 -m test/mock2 -i **/src/main/**.min.js
```

The above command would get all the source files from `src/main/js` folder, get the test files from `test/js`.
It will also load some mock files from `test/mock1` and `test/mock2`. Mocks would be loaded be fore your source files
test files when running the tests.
Important thing to note here is that from the source folder it will ignore all the files which have a `.min.js` extension.

After running the top command, in side your project base you would see `specRunner.html` for your jasmine run,
`eslintReport.html` for the Javascript lint for the srcFiles and you should see `coverage` folder. Inside coverage folder,
you would see `index.html`,which has your code coverage stats.

`Karma` has been integrated with `grouch`. Use `-b` or `--browsers` option to specify which browser you want to run your tests on.
We support the following browsers:
* Internet Explorer (command use `-b ie`)
    - IE8 (command use `-b ie8`)
    - IE9 (command use `-b ie9`)
    - IE10 (command use `-b ie10`)
    - IE11 (command use `-b ie11`)
* Chrome (command use `-b chrome`)
* Firefox (command use `-b firefox`)
* Safari (command use `-b safari`)

You can specify multiple browsers like this:
```.sh
grouch -s src/main/js -t test/js -b chrome -b ie8 -b firefox
```
Make sure you have these browsers installed on your machine because karma uses the exe installed on the machine.

All the boolean options can be turned off by using the prefix `--no-`. Example `--no-lint`, `--no-coverage`.

**Note:** This project automatically loads `jquery 1.11.2` version before your `mocks`, `src` and `test` files.
If you project has jquery built into it then it will override the 1.11.2 version with your version.
We also load [sinonjs fake server](http://sinonjs.org/docs/#fakeServer) module to be used to fake `XMLHttpRequest`.

##Contribution

Please feel free to log issues and even send pull request for the changes.
Make sure you log a issue before you send in a pull request and reference that issue in your pull request.
That way everyone knows what did you fix or add to the project.

##Future

Check out the [Grouch Roadmap](https://github.com/gyandeeps/grouch/wiki/Release-Goals).
