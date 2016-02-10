describe('utils.js', function () {
    it('add method', function () {
        var num1 = 4;
        var num2 = 5;
        var expected = 9;
        var actual = utils.add(num1, num2);
        expect(actual).toBe(expected);
    });
    it('subtract method', function () {
        var num1 = 5;
        var num2 = 4;
        var expected = 1;
        var actual = utils.subtract(num1, num2);
        expect(actual).toBe(expected);
    });
    it('multiply method', function () {
        var num1 = 2;
        var num2 = 3;
        var expected = 6;
        var actual = utils.multiply(num1, num2);
        expect(actual).toBe(expected);
    });
    it('divide method', function () {
        var num1 = 3;
        var num2 = 2;
        var expected = 1.5;
        var actual = utils.divide(num1, num2);
        expect(actual).toBe(expected);
    });
    it('spying on functions', function () {
        expect(utils.add(2, 1)).toBe(3);
        expect(utils.subtract(2, 1)).toBe(1);
        expect(utils.multiply(2, 1)).toBe(2);
        expect(utils.divide(2, 1)).toBe(2);
        spyOn(utils, 'add');
        spyOn(utils, 'subtract').and.callThrough();
        spyOn(utils, 'multiply').and.returnValue(10);
        spyOn(utils, 'divide').and.callFake(function () {
            return 2;
        });
        utils.add(5, 4);
        utils.subtract(5, 4);
        utils.multiply(5, 4);
        utils.divide(5, 4);
        expect(utils.add).toHaveBeenCalledWith(5, 4);
        expect(utils.subtract).toHaveBeenCalledWith(5, 4);
        expect(utils.multiply).toHaveBeenCalledWith(5, 4);
        expect(utils.divide).toHaveBeenCalledWith(5, 4);
        expect(utils.add(2, 1)).toBeUndefined;
        expect(utils.subtract(2, 1)).toBe(1);
        expect(utils.multiply(2, 1)).toBe(10);
        expect(utils.divide(2, 1)).toBe(2);
        expect(utils.add.calls.any()).toEqual(true);
        expect(utils.add.calls.count()).toBe(2);
        expect(utils.add.calls.allArgs()).toEqual([[5, 4], [2, 1]]);
        expect(utils.add.calls.all()).toEqual([
            { object: utils, args: [5, 4], returnValue: undefined },
            { object: utils, args: [2, 1], returnValue: undefined }
        ]);
        utils.add.calls.reset();
        expect(utils.add.calls.any()).toEqual(false);
    });
    it('spying enabled mocks', function () {
        var mockFunction = jasmine.createSpy('mockFunction');
        utils.call(mockFunction, 3, 4);
        expect(mockFunction).toHaveBeenCalledWith(3, 4);
        var mockObject = jasmine.createSpyObj('mockObject', ['a', 'b']);
        utils.call(mockObject, 5, 6);
        expect(mockObject.a).toHaveBeenCalledWith(5);
    });
    it('jasmine types', function () {
        expect(function () { }).toEqual(jasmine.any(Function));
        expect({ id: 1, name: 'tom' }).toEqual(jasmine.objectContaining({ name: 'tom' }));
        expect([1, 2, 3, 4, 5]).toEqual(jasmine.arrayContaining([5, 2]));
        var spy = jasmine.createSpy('spy');
        spy([1, 2, 3, 4, 5]);
        expect(spy).toHaveBeenCalledWith(jasmine.arrayContaining([2, 5]));
    });
    it('timer mock', function () {
        jasmine.clock().install();
        var spy = jasmine.createSpy('spy');
        setInterval(spy, 1000);
        expect(spy).not.toHaveBeenCalled();
        jasmine.clock().tick(1001);
        expect(spy).toHaveBeenCalled();
        expect(spy.calls.count()).toEqual(1);
        jasmine.clock().tick(9000);
        expect(spy.calls.count()).toEqual(10);
        jasmine.clock().uninstall();
    });
});
jasmine.DEFAULT_TIMEOUT_INTERVAL = 8000;
describe('async test suite', function () {
    it('async spec', function (done) {
        setTimeout(done, 4000);
    }, 7000);
});
