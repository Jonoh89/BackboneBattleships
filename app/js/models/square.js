var app = app || {};

(function () {
    'use strict';

    app.Square = Backbone.Model.extend({
        defaults: {
            ship: false,
            hit: false
        }
    });
})();
