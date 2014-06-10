var app = app || {};

(function ($) {
    'user strict';

    app.GameView = Backbone.View.extend({
        el: '#game',
        initialize: function() {
            this.$grid = this.$('#grid');
            this.$sunk = this.$('#sunk');
            this.listenTo(app.PlayerGrid, 'change:status', this.updateScore);
            this.render();
        },
        render: function() {
            function addSquaresToRow(row){
                var gridRow = app.PlayerGrid.getRow(i);
                gridRow.forEach(function(square){
                    var squareView = new app.SquareView({model:square});
                    row.append(squareView.render().el);
                }, this);
            }

            for(var i = 1; i <= app.PlayerGrid.getGridSize(); i++) {
                var row = $("<div class='row'></div>");
                addSquaresToRow(row);
                this.$grid.append(row);
            }
        },
        updateScore: function() {
            this.$sunk.html('Score: ' + app.PlayerGrid.sunkenShips());
        }
    });

})(jQuery);