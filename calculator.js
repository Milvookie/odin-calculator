const Calculator = {
    state: {
        currentState: {
            acceptDigit: true,
            acceptDecimal: true,
            acceptOperator: false,
            readyForCalculation: false,
        },
        lastBtnClicked: null,
        isCurrentInputFloat: false,
    },
    history: [],

    operandOne: '',
    operandTwo: '',
    operation: {
        value1: null,
        value2: null,
        operator: null,
    },

    getLastInput() {
        let lastInput = this.history[this.history.length - 1]
        return lastInput
    },

    updateState() {

        if (this.operandOne != '') {
            this.state.currentState.acceptOperator = true
        }

        if (this.getLastInput() == '.') {
            this.state.currentState.acceptDecimal = false
            this.state.currentState.acceptOperator = false
        }

        if (typeof this.getLastInput() == 'number') {
            this.state.currentState.acceptDigit = false
            this.state.currentState.acceptDecimal = false
        } else {
            this.state.currentState.acceptDigit = true
        }
        
        if (this.operation.value1 && this.operation.operator && (this.operandTwo != '')) {
            this.state.currentState.readyForCalculation = true
        } else {
            this.state.currentState.readyForCalculation = false
        }

        if (this.operation.operator) {
            this.state.currentState.acceptOperator = false
        }

    },

    handleClick(btn) {
        let key = btn.getAttribute('data-type')
        let value = btn.getAttribute('value')
        
        switch (key) {
            case 'digit':
                if (this.state.currentState.acceptDigit) {
                    console.log('accept digit');
                    if (!this.operation.value1) {
                        this.operandOne += value
                    } else {
                        this.operandTwo += value
                    }

                    this.displayUserInput(value)
                    
                } else {
                    console.log('does not accept digit');
                    
                }
                
                break;
                case 'decimal':
                    if (this.state.currentState.acceptDecimal) {
                        console.log('accept decimal');
                        if (!this.operation.value1) {
                            this.operandOne += value
                        } else {
                            this.operandTwo += value
                        }
                        this.displayUserInput(value)
                        //this.state.isCurrentInputFloat = true

                        
                    } else {
                        console.log('does not accept decimal');
                        
                    }
                
                break;
                case 'operator':
                    if (this.state.currentState.acceptOperator) {
                        console.log('accept operator');
                        if (!this.operation.value1) {
                            this.operation.value1 = Number(this.operandOne)
                            this.state.currentState.acceptDecimal = true
                        }
                        this.operation.operator = value
                        this.displayUserInput(value)
                        
                    } else if (this.state.currentState.readyForCalculation) {
                        console.log('ready for calcul but does not accept operator');
                        this.handleCalculation()
                        this.operation.operator = value
                        this.displayUserInput(value)
                        
                    } 
                    else {
                        console.log('does not accept operator');
                        
                    }
                
                break;
                case 'equal':
                    if (this.state.currentState.readyForCalculation) {
                        console.log('accept equal');
                        this.handleCalculation()
                        
                    } else {
                        console.log('does not accept equal');
                        
                    }
                
                break;
        
            default:
                break;
        }

        this.updateState()
        
    },

    displayUserInput(value) {
        this.history.push(value)
        let el = document.querySelector('.user-input')
        el.textContent = this.history.join('')
    },

    displayCalculationResult(value) {
        this.history = []
        let el = document.querySelector('.result')
        el.textContent = value
        this.displayUserInput(value)
    },

    handleCalculation() {
        this.operation.value2 = Number(this.operandTwo)
        let result = this.operate()
        this.displayCalculationResult(result)
        this.operation.value1 = result
        this.operation.operator = this.operation.value2 = null
        this.operandTwo = ''
        this.state.currentState.acceptDecimal = true
    },

    operate() {
        let num1 = this.operation.value1
        let num2 = this.operation.value2
        let symbol = this.operation.operator

        switch (symbol) {
            case '+':
                return this.add(num1, num2)
            case '-':
                return this.substract(num1, num2)
            case 'x':
                return this.multiply(num1, num2)
            case '/':
                return this.divide(num1, num2)
            default:
                break;
        }
    },

    add(a, b) {
        return a + b
    },

    substract(a, b) {
        return a - b
    },

    multiply(a, b) {
        return a * b
    },

    divide(a, b) {
        if (a == 0 || b == 0) {
            return 'Nope'
        }
        return a / b
    },
}

document.querySelector('.container').addEventListener('click', (e) => {
    if (e.target.nodeName == 'BUTTON') {
        Calculator.handleClick(e.target)
    }
})