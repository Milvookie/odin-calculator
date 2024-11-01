const Calculator = {
    state: {
        initial: true,
        num: false,
        operator: false,
        decimal: false,
        percent: false,
    },
    history: [],
}

let history = []

let state = {
    initial: true,
    decimal: false,
}

let operation = {
    value1: null,
    value2: null,
    operator: null,
}

let operandOne, operandTwo, operator;
operandOne = operandTwo = operator = ''

document.querySelector('.container').addEventListener('click', (e) => {
    if (e.target.nodeName == 'BUTTON') {
        //handleClick(e.target)
        clickHandle(e.target)
    }
})

function displayUserInput(value) {
    history.push(value)
    let el = document.querySelector('.user-input')
    el.textContent = history.join('')
}

function clickHandle(btn) {
    let key = btn.getAttribute('data-type')
    let value = btn.getAttribute('value')

    switch (key) {
        case 'digit':
            if (operation.value1) {
                if (operation.operator) {
                    operandTwo += value
                    displayUserInput(value)
                }
            } else {
                operandOne += value
                displayUserInput(value)
            }

            break;

        case 'operator':
            if (operandOne != '') {
                if (!operation.value1) {
                    operation.value1 = Number(operandOne)
                    operation.operator = value
                    displayUserInput(value)
                } else {
                    if (!operation.operator) {
                        operation.operator = value
                        displayUserInput(value)
                        console.log('no new number');
                    }       
                    if (operandTwo != '') {
                        console.log('operandTwo is true');
                        operation.value2 = Number(operandTwo)
                        handleCalculation(operation)
                        operation.operator = value
                        displayUserInput(value)
                    } 
                }
            }
            
            
            
            break;

        case 'equal':
            if ((operation.value1 && operation.operator) && operandTwo != '') {
                console.log('can do operation');
                operation.value2 = Number(operandTwo)
                handleCalculation(operation)
                
            } else {
                console.log('no can do');
            }

            break;

        case 'decimal':

            break;

        case 'clear':
            value == 'reset' ? clearAll() : console.log('delete')
            break;

        default:
            break;
    }

    console.log(state);
    console.log(operation);
}

function handleClick(btn) {
    let key = btn.getAttribute('data-type')
    let value = btn.getAttribute('value')

    console.log(state);
    console.log(operation);

    if (state.initial) {
        if (key == 'digit') {
            operandOne += value
            state.initial = false
            displayUserInput(value)
        } else if (key == 'decimal') {
            operandOne += value
            state.decimal = true
            state.initial = false
            displayUserInput(value)
        }

    } else {
        console.log('second step');
        if (state.decimal) {
            console.log('waiting for a number');
            if (key == 'digit') {
                operandOne += value
                displayUserInput(value)
                state.decimal = false
            }
        } else {
            if (key == 'digit') {
                operandOne += value
                displayUserInput(value)
            } else if (key == 'operator') {
                operation.value1 = Number(operandOne)
                console.log(key);
            }


        }

        // switch (key) {
        // case 'operator':
        // displayUserInput(value)
        // break;
        // case 'digit':
        // displayUserInput(value)
        // break;
        // case 'decimal':
        // displayUserInput(value)
        // break;
        // case 'clear':
        // value == 'reset' ? clearAll() : console.log('delete')
        // break;
        // 
        // default:
        // break;
        // }
    }

}

function displayResult(value) {
    let el = document.querySelector('.result')
    el.textContent = value
    history = []
    displayUserInput(value)
}

function clearAll() {
    document.querySelector('.user-input').textContent = ''
    document.querySelector('.result').textContent = '0'
    history = []
    operandOne = operandTwo = operator = ''
    for (const key in operation) {
        operation[key] = null
    }
    
}

function handleCalculation(obj) {
    let result = operate(obj)
    displayResult(result)
    operandOne = result.toString()
    operandTwo = operator = ''
    for (const key in operation) {
        operation[key] = null
    }
    operation.value1 = result
}

function operate(obj) {
    let num1 = obj.value1
    let num2 = obj.value2
    let symbol = obj.operator

    switch (symbol) {
        case '+':
            return add(num1, num2)
        case '-':
            return substract(num1, num2)
        case 'x':
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
    if (a == 0 || b == 0) {
        return 'Nope'
    }
    return a / b
}