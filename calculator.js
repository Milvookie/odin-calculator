const Calculator = {
    state: {
        currentState: {
            acceptDigit: true,
            acceptDecimal: true,
            acceptOperator: false,
            readyForCalculation: false,
        },
        lastBtnClicked: {
            key: null,
            value: null,
        },
    },
    history: [],

    operandOne: '',
    operandTwo: '',
    operation: {
        value1: null,
        value2: null,
        operator: null,
    },

    updateLastBtn(key, value) {
        this.state.lastBtnClicked.key = key
        this.state.lastBtnClicked.value = value
    },

    updateState() {    

        if (this.state.lastBtnClicked.key == 'digit') {
            this.state.currentState.acceptOperator = true
            if (!this.operation.value1) {
                if (!this.operandOne.includes('.')) {
                    this.state.currentState.acceptDecimal = true
                }
            } else {
                if (!this.operandTwo.includes('.')) {
                    this.state.currentState.acceptDecimal = true
                }
            }
        }

        if (this.state.lastBtnClicked.key == 'operator') {
            this.state.currentState.acceptDigit = true
            this.state.currentState.acceptOperator = false
            this.state.currentState.acceptDecimal = true
        }

        if (this.state.lastBtnClicked.key == 'equal') {
            this.state.currentState.acceptDigit = false
            this.state.currentState.acceptDecimal = false
            this.state.currentState.acceptOperator = true
        }

        if (this.state.lastBtnClicked.key == 'decimal') {
            this.state.currentState.acceptDecimal = false
            this.state.currentState.acceptOperator = false
        }

        if (this.operation.value1 && this.operation.operator && (this.operandTwo != '')) {
            this.state.currentState.readyForCalculation = true
        } else {
            this.state.currentState.readyForCalculation = false
        }

        if (this.state.lastBtnClicked.value == 'reset') {
            this.state.currentState.acceptDigit = true
            this.state.currentState.acceptDecimal = true
            this.state.currentState.acceptOperator = false
            this.state.currentState.readyForCalculation = false 
        }

    },

    handleClick(btn) {
        let key = btn.getAttribute('data-type')
        let value = btn.getAttribute('value')

        switch (key) {
            case 'digit':
                if (this.state.currentState.acceptDigit) {
                    if (!this.operation.value1) {
                        this.operandOne += value
                    } else {
                        this.operandTwo += value
                    }

                    this.displayUserInput(value)
                    this.updateLastBtn(key, value)

                }
                break;

            case 'decimal':
                if (this.state.currentState.acceptDecimal) {
                    if (!this.operation.value1) {
                        this.operandOne += value
                    } else {
                        this.operandTwo += value
                    }
                    this.displayUserInput(value)
                    this.updateLastBtn(key, value)
                }
                break;

            case 'operator':
                if (this.state.currentState.readyForCalculation) {
                    this.handleCalculation()
                    this.operation.operator = value
                    this.displayUserInput(value)
                    this.updateLastBtn(key, value)
                }
                else if (this.state.currentState.acceptOperator) {
                    if (!this.operation.value1) {
                        this.operation.value1 = Number(this.operandOne)
                    }
                    this.operation.operator = value
                    this.displayUserInput(value)
                    this.updateLastBtn(key, value)

                }
                break;

            case 'equal':
                if (this.state.currentState.readyForCalculation) {
                    this.handleCalculation()
                    this.updateLastBtn(key, value)
                } 
                break;

            case 'clear':
                value == 'reset' ? this.clearAll(key, value) : this.deleteLastInput()
                break;

            default:
                break;
        }

        this.updateState()

    },

    transformStrToNumber(str) {
        if (str.slice(-1) == '.') {
            return Number(str.slice(0, -1)) + '.'
        } else {
            return Number(str)
        }
    },

    displayUserInput(value) {
        let content = ''
        if (value) {
            this.history.push(value)
        }
        if (!this.operation.value1) {
            content = this.transformStrToNumber(this.operandOne)
        } else {
            if (this.operandTwo != '') {
                content += this.operation.value1 + this.operation.operator + this.transformStrToNumber(this.operandTwo)
                
            } else {
                content += this.operation.value1 + this.operation.operator
            }  
        }
        let el = document.querySelector('.user-input')
        el.textContent = content
    },

    displayCalculationResult(value) {
        this.history = []
        let el = document.querySelector('.result')
        el.textContent = value
    },

    getLastInput() {
        let lastInput = this.history[this.history.length - 1]
        if (typeof lastInput == 'number') {
            return {
                key: 'equal',
                value: "="
            }
        } else if (Number(lastInput)) {
            return {
                key: 'digit',
                value: lastInput
            }
        } else {
            if (lastInput == '.') {
                return {
                    key: 'decimal',
                    value: lastInput
                }
            } else {
                return {
                    key: 'operator',
                    value: lastInput
                }
            }
        }
    },

    handleCalculation() {
        this.operation.value2 = Number(this.operandTwo)
        let result = this.operate()
        this.displayCalculationResult(result)
        this.history = []
        this.displayUserInput(result)
        this.operation.value1 = result
        this.operation.operator = this.operation.value2 = null
        this.operandTwo = ''
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

    clearAll(key, value) {
        this.operandOne = this.operandTwo = ''
        for (const key in this.operation) {
            this.operation[key] = null
        }
        this.displayCalculationResult(0)
        this.history = []
        this.displayUserInput()
        this.updateLastBtn(key, value)
    },

    deleteLastInput() {
        if (this.state.lastBtnClicked.key == 'digit' || this.state.lastBtnClicked.key == 'decimal' || this.state.lastBtnClicked.key == 'operator') {
            this.history.pop()
            if (this.state.lastBtnClicked.key == 'digit' || this.state.lastBtnClicked.key == 'decimal') {
                if (this.operation.value1) {
                    this.operandTwo = this.operandTwo.substring(0, this.operandTwo.length - 1)
                } else {
                    this.operandOne = this.operandOne.substring(0, this.operandOne.length - 1)
                }
            } else if (this.state.lastBtnClicked.key == 'operator') {
                this.operation.operator = null
            }
            this.displayUserInput()
            let previousBtn = this.getLastInput()
            this.updateLastBtn(previousBtn.key, previousBtn.value)
        }
    },
}

document.querySelector('.container').addEventListener('click', (e) => {
    if (e.target.nodeName == 'BUTTON') {
        Calculator.handleClick(e.target)
    }
})