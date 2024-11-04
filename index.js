const Calculatrice = {
    state: {
        nextBtn: {
            digit: true,
            operator: false,
            decimal: true,
            equal: false,
        },
        lastBtnClicked: null,
        isCurrentInputFloat: false
    },
    history: [],

    operandOne: '',
    operandTwo: '',
    operation: {
        value1: null,
        value2: null,
        operator: null,
    },

    updateOperation() {

    },

    updateState(key, value) {
        console.log('update state');
        if (this.operation.value1 && this.operation.operator && (this.operandTwo != '')) {
            this.state.nextBtn.equal = true;
        }
        //update last button clicked
        let lastBtn = this.updateLastBtnClicked(key)
        console.log('last button is ' + lastBtn);
        //update state next button

        switch (key) {
            case 'equal':

            break;
            case 'digit':
                this.state.nextBtn.operator = true;
                break;
            case 'operator':
                this.state.nextBtn.operator = false;
                if (!this.operation.value1) {
                    this.operation.value1 = Number(this.operandOne)
                }

                break;

            case 'decimal':
                this.state.isCurrentInputFloat = true;
                for (const key in this.state.nextBtn) {
                    this.state.nextBtn['digit'] = true
                    if (key != 'digit') {
                        this.state.nextBtn[key] = false
                    }
                }
                break;

            default:
                break;
        }



        //update



        //update is current float

    },

    updateLastBtnClicked(key, value) {
        return this.state.lastBtnClicked = key
        // this.state.lastBtnClicked[key] = true
        // if (value == '%') {
        // this.state.lastBtnClicked.percent = true
        // }
    },

    displayUserInput(value) {
        this.history.push(value)
        let el = document.querySelector('.user-input')
        el.textContent = this.history.join('')
    },

    handleClick(btn) {
        let key = btn.getAttribute('data-type')
        let value = btn.getAttribute('value')

        switch (key) {
            case 'digit':
                if (this.state.nextBtn.digit) {
                    console.log('accept digit');

                    if (!this.operation.value1) {
                        console.log('first operand');
                        this.displayUserInput(value)
                        this.operandOne += value

                    } else {
                        console.log('second operand');
                        this.displayUserInput(value)
                        this.operandTwo += value

                    }
                    this.updateState(key, value)
                } else {
                    console.log('do not accept digit');
                }

                break;

            case 'operator':
                if (this.state.nextBtn.operator) {
                    console.log('accept operator');
                    this.operation.operator = value
                    this.displayUserInput(value)
                    this.updateState(key, value)

                } else {
                    console.log('do not accept operator');
                }

                break;

            case 'equal':
                if (this.state.nextBtn.equal) {
                    console.log('accept equal');
                    this.updateState(key, value)

                } else {
                    console.log('do not accept equal');

                }
                break;

            case 'decimal':
                if (this.state.nextBtn.decimal) {
                    console.log('accept decimal');
                    this.updateState(key, value)

                } else {
                    console.log('do not accept decimal');
                }

                break;

            case 'clear':

                break;

            default:
                break;
        }

        console.log(this.state.isCurrentInputFloat);
        console.log(this.state.nextBtn);
        console.log(this.state.lastBtnClicked);



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
        //Calculatrice.handleClick(e.target)
    }
})