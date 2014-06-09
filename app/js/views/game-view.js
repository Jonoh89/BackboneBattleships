var app = app || {};

(function ($) {
    'user strict';

    app.GameView = Backbone.View.extend({
        el: '#game',
        initialize: function() {
            this.$grid = this.$('#grid');
            this.render();
        },
        render: function() {
            var playerGrid = new app.Grid();

            function addSquaresToRow(row){
                var gridRow = playerGrid.getRow(i);
                gridRow.forEach(function(square){
                    var squareView = new app.SquareView({model:square});
                    row.append(squareView.render().el);
                }, this);
            }

            for(var i = 1; i <= playerGrid.getGridSize(); i++) {
                var row = $("<div class='row'></div>");
                addSquaresToRow(row);
                this.$grid.append(row);
            }
        }
    });

})(jQuery);