var app = app || {};

(function ($) {
    'user strict';

    app.GameView = Backbone.View.extend({
        el: '#game',
        events: {
            'click #play-again': 'newGame'
        },
        initialize: function() {
            this.$grid = this.$('#grid');
            this.$sunk = this.$('#sunk');
            this.$sunkAlert = this.$('#sunkAlert');
            this.sunkenShips = 0;
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
            var sunkenShips = app.PlayerGrid.sunkenShips();
            this.$sunk.html('Score: ' + sunkenShips);
            if(sunkenShips > this.sunkenShips) {
                var self = this;
                $(this.$sunkAlert).removeClass('hidden');
                setTimeout(function() {
                        self.$sunkAlert.addClass('hidden');
                },4000);
            }
            this.sunkenShips = sunkenShips;
            if(this.sunkenShips === 3) {
                $("#finishedModal").modal({show:true});
            }
        },
        newGame: function() {
            window.location.reload();
        }
    });

})(jQuery);