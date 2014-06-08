Backbone Battleships
===================

A basic battleship game written in Backbone

## Getting Started

To get you started you need install the dependencies:

### Prerequisites


This project will require a number of node.js tools to initialize and run the project on your machine. You must have node.js and its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).


### Install Dependencies

There is two kinds of dependencies in this project: node tools and JavaScript librarys. 

* You get the tools the project depend upon via `npm`, the [node package manager][npm].
* You get the Backbone code via `bower`, a [client-side code package manager][bower].

I have preconfigured `npm` to automatically run `bower` so we can simply do:

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