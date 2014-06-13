var app = app || {};

(function() {
    'use strict';

    var gridSize = 10; //can't change this only because of css
    //changing these works, add more ships and change sizes
    var shipSizes = [5,4,4];

    app.Grid = Backbone.Collection.extend({
        model: app.Square,
        squaresWithShips: [],
        ships: [],

        initialize: function(){
            var self = this;

            //produces an array with all the squares that will contain a ship
            shipSizes.forEach(function(size) {
                var shipCoordinates = self.placeShip(size);
                self.ships.push({coordinates:shipCoordinates,squares: []});
                self.squaresWithShips = self.squaresWithShips.concat(shipCoordinates);
            });

            //creates the squares and puts ships in the locations determined above
            for(var y = 1; y <= gridSize; y++) for (var x = 1; x <= gridSize; x++) {
                var coordinateString = 'x' + x + 'y' + y;
                var ship = $.inArray(coordinateString, this.squaresWithShips) > -1;

                var square = new app.Square({x: x, y: y, ship: ship});
                this.addSquareToShip(coordinateString, square);
                this.add(square);
            }
        },

        //adds square to ship to help track when ship is sunk
        addSquareToShip: function (coordinateString, square) {
            this.ships.forEach(function (ship) {
                if ($.inArray(coordinateString, ship.coordinates) > -1) {
                    ship.squares.push(square);
                }
            });
        },

        //finds suitable place for ship on the grid that does not overlap other ships or go off the grid
        placeShip: function(shipSize) {
            var self = this;
            function randomNumberFrom(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            var shipCoordinates = [];
            var shipDirectionCoordinate = randomNumberFrom(1, gridSize - shipSize); //1 to ships length so size of ship will fit in grid
            var shipDirectionVertical = randomNumberFrom(0,1) === 1; //true or false

            var startingXCoordinate =  shipDirectionVertical ?  randomNumberFrom(1,gridSize) : shipDirectionCoordinate;
            var startingYCoordinate =  shipDirectionVertical ?  shipDirectionCoordinate : randomNumberFrom(1,gridSize);

            for (var i = 0; i < shipSize; i++) {
                if(shipDirectionVertical) {
                    shipCoordinates.push('x' + startingXCoordinate + 'y' + (startingYCoordinate + i));
                } else {
                    shipCoordinates.push('x' + (startingXCoordinate + i) + 'y' + startingYCoordinate);
                }
            }
            var duplicateCoordinate = false;
            shipCoordinates.forEach(function(coordinates) {
                if($.inArray(coordinates, self.squaresWithShips) > -1) {
                    duplicateCoordinate = true;
                }
            });
            return duplicateCoordinate ? this.placeShip(shipSize) : shipCoordinates;
        },

        getGridSize: function() {
            return gridSize;
        },

        getRow: function(row) {
            return this.filter(function(square) {
                 return square.get('y') === row;
            });
        },

        sunkenShips: function() {
            var sunkenCount = 0;
            this.ships.forEach(function(ship) {
                var notHitSquares =  ship.squares.filter(function(square) {
                    return square.get('hit') === false;
                });
                if (notHitSquares.length === 0) {
                    sunkenCount++;
                }
            });
            return sunkenCount;
        }
    });

    app.PlayerGrid = new app.Grid();
})();