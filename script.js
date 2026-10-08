const container = document.querySelector(".container");
const total = document.querySelector(".total");
const exclFloat = document.querySelector(".excl-float");
const inputField = document.querySelector("input");
const inputs = document.querySelectorAll("input");
const test = document.getElementById("testSpan");

function totalCalc(inp, currValue) {
  return (inp * currValue).toFixed(2);
}

// For input fields and totals
container.addEventListener("input", function (e) {
  if (e.target.tagName === "INPUT") {
    const currencyValue =
      e.target.parentElement.querySelector(".value").textContent;
    const targetSpan = e.target.parentElement.querySelector(".small-total");

    targetSpan.textContent = totalCalc(e.target.value, currencyValue);
  }
});

container.addEventListener("input", function (e) {
  if (e.target.tagName === "INPUT") {
    let bigTotal = 0;

    const totalField = document.querySelector(".total");
    const excFloatField = document.querySelector(".excl-float");
    const smallTotals = document.querySelectorAll(".small-total");
    const diff = document.getElementById("diff").querySelector("span");
    const compTot = document.getElementById("compTot");

    for (let i of smallTotals) {
      let iNum = parseFloat(i.textContent) || 0;
      bigTotal += iNum;
    }

    totalField.textContent = bigTotal.toFixed(2);
    excFloatField.textContent = (
      parseFloat(totalField.textContent) - 200
    ).toFixed(2);
    let minFloat = excFloatField.textContent;
    let compVal = compTot.value || 0;
    let totVal = parseFloat(totalField.textContent) || 0;
    let shortage = (compVal - minFloat).toFixed(2);
    if (shortage > 0) {
      diff.textContent = `-${shortage}`;
    } else if (shortage < 0) {
      diff.textContent = Math.abs(shortage);
    } else {
      diff.textContent = "0";
    }
  }
});

function clearInputs() {
  for (let i of inputs) {
    i.value = "";
  }
  location.reload();
}

// clear button to clear inputs ///
// field for computer total ///

// onboard save function for accidental closing of app ???
