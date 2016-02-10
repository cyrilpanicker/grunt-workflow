var utils = {
    add: (num1,num2) => num1 + num2,
    subtract: (num1,num2) => num1 - num2,
    multiply:(num1,num2) => num1 * num2,
    divide:(num1,num2) => num1/num2,
    call: (callback,num1,num2) => {
        if(typeof callback === 'function'){
            callback(num1,num2);
        } else {
            callback.a(num1);
            callback.b(num2);
        }
    }
};

document.write('hi tom');