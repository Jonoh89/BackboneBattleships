Backbone Battleships
===================

A basic battleship game written in Backbone, to see it running to do http://development.bbbattleships.divshot.io/

## Getting Started

To get you started you need install the dependencies:

### Prerequisites


This project will require a number of node.js tools to initialize and run the project on your machine. You must have node.js and its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

It will also require the grunt and bower cli, this is ideally installed globally with the following commands: 

```
npm install -g grunt-cli
npm install -g bower
```
note: sudo or admin rights may be required.

### Install Dependencies

There is two kinds of dependencies in this project: node tools and JavaScript libraries. 

* You get the tools the project depend upon via `npm`, the [node package manager][npm].
* You get the Backbone code via `bower`, a [client-side code package manager][bower].

I have pre-configured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files


### Run the Application

I have preconfigured the project with a simple development web server.  The simplest way to start this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.

### Development

I have created a grunt task for development that will:
* Start the karma test server 
* Run jshint and unit tests whenever a javascript file is saved. 
* Compile less into standard .css files

To start this run:

```
grunt development
```

### Compatibly

Please note this app was developed in chrome with a total disregard for outdated browsers :) so update or miss out on the best battleships game you will ever play!

Tested and seems to (sort of) work on iPhone and everything but the background on my windows phone 8 phone (which is a miracle based on what most sites look like using it).
