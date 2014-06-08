var app = app || {};

(function ($) {
    'user strict';

    app.GameView = Backbone.View.extend({
        el: '#game',
        initialize: function() {
            this.$hits = this.$('#hits');
            this.render();
        },
        render: function() {
            this.$hits.html('0 Hits');
        }
    });

})(jQuery);