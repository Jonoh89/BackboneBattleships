var app = app || {};

(function ($) {
    'user strict';

    app.SquareView = Backbone.View.extend({
        tagName: 'span',
        className: 'col-md-1',
        template: _.template($('#square-template').html()),
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        events: {
            'click .square': 'squareHit'
        },

        squareHit: function() {
            this.model.set('hit',true);
        }

    });

})(jQuery);