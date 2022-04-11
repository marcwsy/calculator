// operator functions
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
   return a / b;
}
function operate(operator, a, b) {
a = Number(a);
b = Number(b);
    switch (operator) {
    case '+': return add(a, b)
    case '-': return subtract(a, b)
    case 'x': return multiply(a, b)
    case '/': if (b === 0) return null;
    else return divide(a, b)
    default: return null;
    }
}

// global variables
let shouldResetScreen = false;
let firstDigit = '';
let secondDigit = '';
let operation = null;

// get elements
const firstDisplay = document.getElementById('firstDisplay');
const secDisplay = document.getElementById('secDisplay');
const clear = document.getElementById('clear');
const equal = document.getElementById('equal');
const erase = document.getElementById('delete');

// set numbers and operators
const numberButton = document.querySelectorAll('[data-number]');
const operatorButton = document.querySelectorAll('[data-operator]');
numberButton.forEach((button) => button.addEventListener('click', () => displayNum(button.textContent)));
operatorButton.forEach((button) => button.addEventListener('click', () => displayOp(button.textContent)));

function displayNum(number) {
    // allows to display more than a single digit
    if (firstDisplay.textContent === '0' || shouldResetScreen)
    resetScreen();
    // displays the numbers
    firstDisplay.textContent += number;
}
function displayOp(operator) {
    // string together several operations
    if (operation !== null) 
    evaluate();
    // sets the number in firstDigit, operator in operation
    firstDigit = firstDisplay.textContent;
    operation = operator;
    // displays number and operator
    secDisplay.textContent = `${firstDigit} ${operation}`;
    // resets for the full equation
    shouldResetScreen = true;
}

function evaluate() {
    if (operation === '/' && firstDisplay.textContent === '0') {
        alert("you can't do that");
        return
    }
    // first display refreshes and shows the second digit and stores the number
    secondDigit = firstDisplay.textContent;
    // shows the total/result
    firstDisplay.textContent = roundResult(operate(operation, firstDigit, secondDigit));
    // resets then shows the full equation
    secDisplay.textContent = `${firstDigit} ${operation} ${secondDigit} =`;
    operation = null;
}
equal.addEventListener('click', evaluate);

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function clearScreen() {
    // clears the data
    firstDigit = '';
    secondDigit = '';
    operation = null;
    // clears the text output on the displays
    firstDisplay.textContent = 0;
    secDisplay.textContent = '';
}
clear.addEventListener('click', clearScreen);

function resetScreen() {
    firstDisplay.textContent = '';
    shouldResetScreen = false;
}

function deleteNumber() {
    firstDisplay.textContent = firstDisplay.textContent
    .toString().slice(0, -1)
}
erase.addEventListener('click', deleteNumber);