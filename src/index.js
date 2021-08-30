function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    const arr = expr.split('');

    let openBrackets = 0;
    let closeBrackets = 0;

    arr.forEach(element => {
        if (element == '(') {
            openBrackets++;
        } else if (element == ')') {
            closeBrackets++;
        }
    })
    if (openBrackets !== closeBrackets) {
        throw new Error("ExpressionError: Brackets must be paired");
    }

    function twoNumbersCalculator(x, y, operatorXY) {
        if (operatorXY === '+') {
            return (x + y);
        }
        if (operatorXY === '-') {
            return (x - y);
        }
        if (operatorXY === '*') {
            return (x * y);
        }
        if (operatorXY === '/' && y === 0) {
            throw new Error("TypeError: Division by zero.");
        }
        if (operatorXY === '/') {
            return (x / y);
        }
    }

    let store = '';
    let numbersArray = [];

    arr.forEach(element => {
        if (/[0-9]/.test(element)) {
            store += element;
        }
        if (/[\*\/\-\+\(\)]/.test(element)) {
            if (store.length !== 0) {
                numbersArray.push(Number(store));
                store = '';
            }
            numbersArray.push(element);
        }
    })
    if (store !== '') {
        numbersArray.push(Number(store));
    }

    function simpleCalculator(numbersArray) {
        let a = 0;
        let b = 0;
        let firstOperators = ['*', '/'];
        let secondOperatops = ['+', '-'];

        let operator = '';

        a = numbersArray[0];
        for (let i = 1; i < numbersArray.length; i++) {
            if (secondOperatops.includes(numbersArray[i])&& numbersArray[i].length === 1) {
                if (operator == '') {
                    operator = numbersArray[i];
                    b = numbersArray[i + 1];
                } else {
                    a = twoNumbersCalculator(a, b, operator);
                    operator = numbersArray[i];
                    b = numbersArray[i + 1];
                }
            }
            if (firstOperators.includes(numbersArray[i])) {
                if (operator == '') {
                    a = twoNumbersCalculator(a, numbersArray[i + 1], numbersArray[i]);
                } else {
                    b = twoNumbersCalculator(b, numbersArray[i + 1], numbersArray[i]);
                }
            }
            }
            if (operator !== '') {
                a = twoNumbersCalculator(a, b, operator);
        }
        return a;
    }
    return simpleCalculator(numbersArray);

}

module.exports = {
    expressionCalculator,
};
