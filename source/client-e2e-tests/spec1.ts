/// <reference path="../typings/tsd.d.ts" />

describe('Calculator Spec',() => {
    
    var firstNumber = element(by.model('first'));
    var secondNumber = element( by.model('second'));
    var goButton = element(by.id('gobutton'));
    var latestResult = element(by.binding('latest'));
    
    var add = (num1:number,num2:number) => {
        firstNumber.sendKeys(num1.toString());
        secondNumber.sendKeys(num2.toString());
        goButton.click();
    };
    
    beforeEach(() => {
        browser.get('http://juliemr.github.io/protractor-demo/');
    });
    
    it('should have a title',() => {
        expect(browser.getTitle()).toEqual('Super Calculator');
    });
    
    it('should add 1 and 2',function(){
        add(1,2);
        expect(latestResult.getText()).toEqual('3');
    });
    
    it('should add 4 and 6',function(){
        add(4,6);
        expect(latestResult.getText()).toEqual('10');
    });
    
    it('sample spec',function(){});
    
});