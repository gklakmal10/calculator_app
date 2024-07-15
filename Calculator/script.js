const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';
let previousInput = '';
let operator = '';
let shouldResetScreen = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const { classList, innerText, dataset } = button;

        if (classList.contains('btn-number')) {
            handleNumber(innerText);
        } else if (classList.contains('btn-operator')) {
            handleOperator(dataset.operator);
        } else if (classList.contains('btn-equals')) {
            handleEquals();
        } else if (classList.contains('btn-ac')) {
            handleAllClear();
        } else if (classList.contains('btn-sign')) {
            handleSign();
        } else if (classList.contains('btn-percent')) {
            handlePercent();
        } else if (classList.contains('btn-decimal')) {
            handleDecimal();
        } else if (classList.contains('btn-ce')) {
            handleClearEntry();
        } else if (classList.contains('btn-c')) {
            handleClear();
        } else if (classList.contains('btn-backspace')) {
            handleBackspace();
        } else if (classList.contains('btn-fraction')) {
            handleFraction();
        } else if (classList.contains('btn-square')) {
            handleSquare();
        } else if (classList.contains('btn-sqrt')) {
            handleSqrt();
        }

        updateDisplay();
    });
});

function handleNumber(number) {
    if (shouldResetScreen) {
        currentInput = number;
        shouldResetScreen = false;
    } else {
        currentInput = currentInput === '0' ? number : currentInput + number;
    }
}

function handleOperator(op) {
    if (currentInput === '' && previousInput === '') return;
    if (operator && currentInput !== '') {
        handleEquals();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
    shouldResetScreen = false;
    updateDisplay();
}

function handleEquals() {
    if (previousInput === '' || currentInput === '') return;
    currentInput = calculate(previousInput, currentInput, operator).toString();
    previousInput = '';
    operator = '';
    shouldResetScreen = true;
    updateDisplay(true);
}

function handleAllClear() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    shouldResetScreen = false;
    updateDisplay();
}

function handleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

function handlePercent() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}

function handleDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function handleClearEntry() {
    currentInput = '0';
    updateDisplay();
}

function handleClear() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    shouldResetScreen = false;
    updateDisplay();
}

function handleBackspace() {
    currentInput = currentInput.slice(0, -1) || '0';
    updateDisplay();
}

function handleFraction() {
    currentInput = (1 / parseFloat(currentInput)).toString();
    updateDisplay();
}

function handleSquare() {
    currentInput = Math.pow(parseFloat(currentInput), 2).toString();
    updateDisplay();
}

function handleSqrt() {
    currentInput = Math.sqrt(parseFloat(currentInput)).toString();
    updateDisplay();
}

function updateDisplay(showResult = false) {
    if (showResult) {
        display.innerText = currentInput;
    } else {
        display.innerText = `${previousInput} ${operator} ${currentInput}`;
    }
}

function calculate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        default:
            return 0;
    }
}
