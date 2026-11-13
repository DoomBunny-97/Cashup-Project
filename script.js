const container = document.querySelector(".container");
const wrappers = container.querySelectorAll('.wrapper');
const total = document.querySelector(".total");
const exclFloat = document.querySelector(".excl-float");
const inputs = document.querySelectorAll("input");
const smallTotals = document.querySelectorAll(".small-total");
const title = document.querySelector('.title-button');
const clearButt = title.querySelector('button');
// console.log(inputs); // ------------------TEST

// ----------------------------------------------- SAVE - LOAD {
function saveDoc(){ 
  smallTotals.forEach((item, index) => {
    localStorage.setItem(`smallTot_${index}`, item.textContent);
  })

  inputs.forEach((field, index) => {
    localStorage.setItem(`field_${index}`, field.value);
  });
}

function loadDoc(){
  smallTotals.forEach((item, index) => {
    const smallTot = localStorage.getItem(`smallTot_${index}`);
    if (smallTot !== null){
      item.textContent = smallTot;
    }
  })

  inputs.forEach((field, index) => {
    const savedValue = localStorage.getItem(`field_${index}`);
    if (savedValue !== null){
      field.value = savedValue;
    }
  });
}
loadDoc();
// ----------------------------------------------- SAVE - LOAD } 

function totalCalc(inp, currValue) {
  return (inp * currValue).toFixed(2);
}

function preventOverflow(inp){
  if (inp.value.length > 5) inp.value = inp.value.slice(0, 5);
}

// For input fields and totals
function updateTotalsSmall(){
  wrappers.forEach(wrap => {
    const itemAmount = wrap.querySelector('input').value; // input amount
    const currValue = wrap.querySelector('.value').textContent; // item value per
    const targetSpan = wrap.querySelector('.small-total'); // span for calc value

    targetSpan.textContent = totalCalc(itemAmount, currValue);


  })
}

function updateTotals() {
    let bigTotal = 0;

    const totalField = document.querySelector(".total");
    const excFloatField = document.querySelector(".excl-float");
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
    let shortage = (compVal - minFloat).toFixed(2);
    if (shortage > 0) {
      diff.textContent = `-${shortage}`;
    } else if (shortage < 0) {
      diff.textContent = Math.abs(shortage);
    } else {
      diff.textContent = "0";
    }

    saveDoc();
};

function clearInputs() {
  for (let i of inputs) {
    i.value = "";
  }
  
  saveDoc();

}

container.addEventListener('input', () => updateTotals());
clearButt.addEventListener('click', () => {
  clearInputs();
  updateTotalsSmall();
  saveDoc();
});
wrappers.forEach(wrap => wrap.addEventListener('input', () => updateTotalsSmall()));
