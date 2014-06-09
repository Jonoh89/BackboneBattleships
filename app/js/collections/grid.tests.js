describe('Grid tests', function() {
    var grid;

    beforeEach(function() {
        grid = new app.Grid();
    });

    it("should initialise with 100 squares", function() {
        expect(grid.length).toBe(100);
    });

    it('should return a gridsize of 10', function() {
        expect(grid.getGridSize()).toBe(10);
    });

    it('should be able to filter by row', function() {
        var y = 1;
        var firstRow = grid.getRow(y);
        expect(firstRow.length).toBe(10);
        firstRow.forEach(function(square) {
            expect(square.get('y')).toBe(y);
        },this);
    });

    it('should keep the x axis in order', function() {
        var y = 3;
        var firstRow = grid.getRow(y);
        expect(firstRow.length).toBe(10);
        var x = 1;
        firstRow.forEach(function(square) {
            expect(square.get('x')).toBe(x);
            x++;
        },this);
    });
});