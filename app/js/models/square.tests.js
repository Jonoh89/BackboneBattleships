describe('Square tests', function() {

    it("should have the correct default values", function() {
        var square = new app.Square();
        expect(square.get('hit')).toBeFalsy();
        expect(square.get('ship')).toBeFalsy();
    });

});