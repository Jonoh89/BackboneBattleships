var app = app || {};

(function () {
    'use strict';

    function addComputedProperty(model, computedProperty, dependencies, fn){
        var callFn = _.debounce(function(){
            var args = dependencies.map(function (property){
                return model.get(property);
            });
            model.set(computedProperty, fn.apply(null, args));
        });

        dependencies.forEach(function(property){
            model.on('change:' + property, callFn);
        });
    }

    app.Square = Backbone.Model.extend({
        defaults: {
            ship: false,
            hit: false
        },
        initialize: function(){
            function calculateStatus(ship, hit){
                if(hit && ship) {
                    return 'sunk';
                } else if(hit && !ship) {
                    return 'miss';
                } else if(!hit && ship) {
                    return 'ship';
                } else if (!hit && !ship) {
                    return 'nothing';
                }
            }
            addComputedProperty(this,'status',['ship', 'hit'],calculateStatus);
            this.set('status',calculateStatus(this.get('ship'),this.get('hit')));
        }
    });
})();
