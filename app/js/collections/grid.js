var app = app || {};

(function() {
    'use strict';

    var gridSize = 10;
    var shipSizes = [5,4,4];
    var ships = [];

    app.Grid = Backbone.Collection.extend({
        model: app.Square,

        initialize: function(){
            function randomNumberFrom(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            var squaresWithShips = [];
            function placeShip(shipSize) {
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
                    if($.inArray(coordinates, squaresWithShips) > -1) {
                        duplicateCoordinate = true;
                    }
                });
                return duplicateCoordinate ? placeShip(shipSize) : shipCoordinates;
            }

            shipSizes.forEach(function(size) {
                var shipCoordinates = placeShip(size);
                ships.push({coordinates:shipCoordinates,squares: []});
                squaresWithShips = squaresWithShips.concat(shipCoordinates);
            });

            function addSquareToShip (coordinateString, square) {
                ships.forEach(function (ship) {
                    if ($.inArray(coordinateString, ship.coordinates) > -1) {
                        ship.squares.push(square);
                    }
                });
            }

            for(var y = 1; y <= gridSize; y++) for (var x = 1; x <= gridSize; x++) {
                var coordinateString = 'x' + x + 'y' + y;
                var ship = $.inArray(coordinateString, squaresWithShips) > -1;


                var square = new app.Square({x: x, y: y, ship: ship});
                addSquareToShip(coordinateString, square);
                this.add(square);
            }
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
            ships.forEach(function(ship) {
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