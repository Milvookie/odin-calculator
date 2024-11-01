let operandOne, operandTwo, operator;

function displayUserInput() {
    let el = document.querySelector('.user-input')
}

function handleClick(btn) {
    console.log(btn.getAttribute('data-type'));
    
}

document.querySelector('.container').addEventListener('click', (e) => {
    if (e.target.nodeName == 'BUTTON') {
        handleClick(e.target)
    }
})

function operate(num1, num2, symbol) {
    switch (symbol) {
        case '+':
            return add(num1, num2)
        case '-':
            return substract(num1, num2)
        case '*':
            return multiply(num1, num2)
        case '/':
            return divide(num1, num2)
        default:
            break;
    }
}

function add(a, b) {
    return a + b
}

function substract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    if (b == 0) {
        return 'Nope'
    }
    return a / b
}