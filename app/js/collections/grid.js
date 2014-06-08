var app = app || {};

(function() {
    'use strict';

    app.Grid = Backbone.Collection.extend({
        model: app.Square,

        initialize: function(){
            for(var x = 1; x <= 10; x++) {
                for(var y = 1; y <= 10; y++) {
                    var square = new app.Square({x:x, y:y});
                    this.add(square);
                }
            }
        }
    });
})();