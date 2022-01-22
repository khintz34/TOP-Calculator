// variables
let runningTotalNum = 0;

let firstNumber = '';
let operandCalled = '';
let secondNumber = '';

let firstNumberSwitch = 'No';
let dotSwitch1 = 'No';
let dotSwitch2 = 'No';
let errorZeroSwitch = 'No';
let errorMessage = 'ERROR: Must Enter Operand Before Calculation Can Occur. Press Clear to Continue!';
let errorMessageDot = 'ERROR: Must Enter Operand Before Calculation Can Occur. Press Clear to Continue!';
let errorZero = 'ERROR: Cannot Divide by Zero. Press Clear to Continue';

const btn9 = document.getElementById('btn9');
const btn8 = document.getElementById('btn8');
const btn7 = document.getElementById('btn7');
const btn6 = document.getElementById('btn6');
const btn5 = document.getElementById('btn5');
const btn4 = document.getElementById('btn4');
const btn3 = document.getElementById('btn3');
const btn2 = document.getElementById('btn2');
const btn1 = document.getElementById('btn1');
const btn0 = document.getElementById('btn0');
const btnDot = document.getElementById('btnDot');

const btnClear = document.getElementById('clearBtn');
const btnDelete = document.getElementById('deleteBtn');
const btnEnter = document.getElementById('enterBtn');

const btnAdd = document.getElementById('addBtn');
const btnSubtract = document.getElementById('subtractBtn');
const btnDivide = document.getElementById('divideBtn');
const btnMultiply = document.getElementById('multiplyBtn');

const totalDisplay = document.querySelector('.totalDisplay');
const actionDisplay = document.querySelector('.actionDisplay');




// arthimetic functions 
function add(a, b) {
    runningTotalNum = Number(a) + Number(b);
    roundToTwo(runningTotalNum);
    console.log(runningTotalNum);
    return runningTotalNum;
    
}

function subtract(a, b) {
    runningTotalNum = a - b;
    roundToTwo(runningTotalNum);
    console.log(runningTotalNum);
    return runningTotalNum;
}

function multiply(a, b) {
    runningTotalNum = a * b;
    roundToTwo(runningTotalNum);
    console.log(runningTotalNum);
    return runningTotalNum;
}

function divide(a, b) {
    if (Number(b) === 0) {
        errorZeroSwitch = 'Yes';
    } else {
        console.log(`b is equal to ${b}`);
        runningTotalNum = (a / b);
        roundToTwo(runningTotalNum);
        console.log(runningTotalNum);
        return runningTotalNum;
    }
}


//operate function to tell calc what to do
function operate(num1, operand, num2) {
    if (operand === '+') {
        add(num1, num2);
        return runningTotalNum;
    } else if (operand === '-') {
        subtract(num1, num2);
        return runningTotalNum;
    } else if (operand === '*') {
        multiply(num1, num2);
        return runningTotalNum;
    } else if (operand === '/') {
        divide(num1, num2);
        return runningTotalNum;
    } else {
        return console.log(`invalid operand ${operand}`);
    };
}

// clear function
function clearCalc() {
    runningTotalNum = 0;
    firstNumber = '';
    secondNumber = '';
    operandCalled = '';
    totalDisplay.innerHTML = '0';
    actionDisplay.innerHTML = '0';
    firstNumberSwitch = 'No';
}

// event listeners 
btn9.onclick = () => displayInTotal(9);
btn8.onclick = () => displayInTotal(8);
btn7.onclick = () => displayInTotal(7);
btn6.onclick = () => displayInTotal(6);
btn5.onclick = () => displayInTotal(5);
btn4.onclick = () => displayInTotal(4);
btn3.onclick = () => displayInTotal(3);
btn2.onclick = () => displayInTotal(2);
btn1.onclick = () => displayInTotal(1);
btn0.onclick = () => displayInTotal(0);

btnAdd.onclick = () => displayInTotal('+');
btnSubtract.onclick = () => displayInTotal('-');
btnDivide.onclick = () => displayInTotal('/');
btnMultiply.onclick = () => displayInTotal('*');
btnClear.onclick = () => displayInTotal(`clear`);
btnEnter.onclick = () => displayInTotal(`=`);
btnDelete.onclick = () => displayInTotal(`delete`);
btnDot.onclick = () => displayInTotal('.');





//decision function 
function displayInTotal(num) {
    console.log(num);

    if (firstNumber === '') {
        firstNumberSwitch = 'No';
    }

    if (num === 'clear') {
        clearCalc();
    } else if (num === '+' || num === '-' || num === '/' || num === '*' ) { 
        evaluateOperator(num);
    } else if (num === '=') {
        operate(firstNumber, operandCalled, secondNumber);
        totalDisplay.innerHTML = runningTotalNum;
        actionDisplay.innerHTML = runningTotalNum;
        firstNumber = runningTotalNum;
        operandCalled = '';
        secondNumber = '';
        dotSwitch2 = 'No';
        dotSwitch1 = 'No';
        if (errorZeroSwitch === 'Yes') {
            actionDisplay.innerHTML = errorZero;
            totalDisplay.innerHTML = '';
            errorZeroSwitch = 'No';
        }
    } else if (num === 'delete') {
        deleteKey();
    } else if (num === '.') {
        evaluateDot();
    } else {
    keepNumber(num); 
    }

}

// Keep Number Function
function keepNumber(num) {
    if (operandCalled === '' && firstNumberSwitch === 'No') {
        firstNumber += num;
    } else if (operandCalled === ''){
            totalDisplay.innerHTML = '';
        return actionDisplay.innerHTML = errorMessage;
    } else {
        secondNumber += num;
    }
    displayScreen();
}

//evaluate operator 
function evaluateOperator(sign) {
        operandCalled = sign;
        firstNumberSwitch = 'Yes';
        displayScreen();
}

// evaluate dot
function evaluateDot() {
    if (firstNumberSwitch === 'Yes' && operandCalled === '') {
        totalDisplay.innerHTML = '';
        return actionDisplay.innerHTML = errorMessageDot;
    } else if (firstNumberSwitch === 'No' && dotSwitch1 === 'No') {
        firstNumber += '.';
        dotSwitch1 = 'Yes';
    } else if (firstNumberSwitch === 'Yes' && dotSwitch2 === 'No') {
        secondNumber += '.';
        dotSwitch2 = 'Yes';
    }
    displayScreen();
}


//display function 
function displayScreen() {
    if (firstNumber === '') {
        actionDisplay.innerHTML = '';
        totalDisplay.innerHTML = '0';
    } else if (firstNumber !== '' && operandCalled === '') {
        actionDisplay.innerHTML = `${firstNumber}`; 
    } else if (firstNumber !== '' && operandCalled !== '' && secondNumber === '') {
        actionDisplay.innerHTML = `${firstNumber} ${operandCalled}`;
    } else {
        actionDisplay.innerHTML = `${firstNumber} ${operandCalled} ${secondNumber}`;
    }
}

function deleteKey() {
    if (secondNumber !== '') {
        secondNumber = secondNumber.toString().slice(0, -1);
    } else if (operandCalled !== '') {
        operandCalled = '';
    } else if (firstNumber === '') {
        return;
    } else {
        firstNumber = firstNumber.toString().slice(0, -1);
    }

    displayScreen();
}

function roundToTwo(num) {    
    runningTotalNum = +(Math.round(num + "e+2")  + "e-2");
}