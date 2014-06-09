var app = app || {};

(function() {
    'use strict';

    var gridSize = 10;

    app.Grid = Backbone.Collection.extend({
        model: app.Square,

        initialize: function(){
            for(var x = 1; x <= gridSize; x++) {
                for(var y = 1; y <= gridSize; y++) {
                    var square = new app.Square({x:x, y:y});
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