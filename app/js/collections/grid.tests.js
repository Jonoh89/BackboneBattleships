describe('Grid tests', function() {

    it("should initialise with 100 squares", function() {
        var grid = new app.Grid();
        expect(grid.length).toBe(100);
    });
});