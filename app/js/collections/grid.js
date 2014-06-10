var app = app || {};

(function() {
    'use strict';

    var gridSize = 10;
    var shipSizes = [5,4,4];

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
                squaresWithShips = squaresWithShips.concat(shipCoordinates);
            });

            for(var y = 1; y <= gridSize; y++) {
                for(var x = 1; x <= gridSize; x++) {
                    var coordinates = {x:x, y:y};
                    if($.inArray('x' + x + 'y' + y,squaresWithShips) > -1) {
                        coordinates.ship = true;
                    }
                    var square = new app.Square(coordinates);
                    this.add(square);
                }
            }
        },

        getGridSize: function() {
            return gridSize;
        },

        getRow: function(row) {
            return this.filter(function(square) {
                 return square.get('y') === row;
            });
        }
    });
})();