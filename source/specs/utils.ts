/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../scripts/utils.ts" />


describe('utils.js',() => {
    it('add',() => {
        var num1 = 4;
        var num2 = 5;
        var expected = 9;
        var actual = utils.add(num1,num2);
        expect(actual).toBe(expected);
    });
    it('subtract',() => {
        var num1 = 5;
        var num2 = 4;
        var expected = 1;
        var actual = utils.subtract(num1,num2);
        expect(actual).toBe(expected);
    });
    describe('utils1.js',() => {
        it('add',() => {
            expect(1).not.toBe(2);
        });
    });
});