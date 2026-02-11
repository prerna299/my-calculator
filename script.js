let currentInput = "";
let previousInput = "";
let currentOperation = "";
const display = document.getElementById("display");

function updateDisplay() {
  if (previousInput && currentOperation) {
    display.value = `${previousInput} ${currentOperation} ${currentInput}`;
  } else {
    display.value = currentInput;
  }
}

function appendNumber(number) {
  // Prevent multiple leading zeros
  if (number === "0" && currentInput === "0") return;
  if (currentInput === "0") currentInput = "";

  currentInput += number;
  updateDisplay();
}

function appendOperation(operation) {
  if (!currentInput) return;

  if (previousInput) {
    calculate();
  }

  currentOperation = operation;
  previousInput = currentInput;
  currentInput = "";
  updateDisplay();
}

function calculate() {
  if (!previousInput || !currentInput) return;

  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  let result;

  switch (currentOperation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      if (current === 0) {
        alert("Error: Cannot divide by zero.");
        clearDisplay();
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  previousInput = "";
  currentOperation = "";
  updateDisplay();
}

function clearDisplay() {
  currentInput = "";
  previousInput = "";
  currentOperation = "";
  updateDisplay();
}

// Event listeners for buttons
document.querySelectorAll("button.number").forEach((btn) => {
  btn.addEventListener("click", () => appendNumber(btn.dataset.number));
});

document.querySelectorAll("button.operator").forEach((btn) => {
  btn.addEventListener("click", () => appendOperation(btn.dataset.operation));
});

document.getElementById("equals").addEventListener("click", calculate);
document.getElementById("clear").addEventListener("click", clearDisplay);
