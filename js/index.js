/*
 * Author: Natasha Pierre-Louis
 *  Script for Tip Calculator - Frontend Mentor Challenge
 */

//Function that handles the calculations for this calculator
const tipCalculator = (bill, tip, numOfPeople) => {
  let convertedTip = tip / 100 || 0;
  let tipAmount = bill * convertedTip || 0;
  let totalBill = bill + tipAmount || 0;
  let tipPerPerson = tipAmount / numOfPeople || 0;
  let splitBill = totalBill / numOfPeople || 0;

  if (numOfPeople === 0 || numOfPeople === null) {
    tipPerPerson = 0;
    splitBill = 0;
  }

  return {
    bill: bill,
    tip: tip,
    numOfPeople: numOfPeople,
    tipPerPerson: roundOff(tipPerPerson, 2),
    tipAmount: roundOff(tipAmount, 2),
    totalBill: roundOff(totalBill, 2),
    splitBill: roundOff(splitBill, 2),
  };
};

//Function that updates calculator everytime there's a change
const updateCalculator = () => {
  let billInput = document.querySelector(".billInput");
  let tipInput = document.querySelectorAll(".tipInput");
  let customInput = document.querySelector(".customInput");
  let resetButton = document.querySelector(".resetButton");
  let tipPerPerson = document.querySelector(".tipPerPerson");
  let totalPerPerson = document.querySelector(".totalPerPerson");
  let numOfPeopleInput = document.querySelector(".numOfPeopleInput");
  let error = document.querySelector(".numOfPeopleSection .errorMessage");
  let totalTip = 0;
  let numOfPeopleTotal = 0;
  let calculatorTotals = {};
  const resetForm = () => {
    resetButton.addEventListener("click", () => {
      tipPerPerson.innerHTML = "$0.00";
      totalPerPerson.innerHTML = "$0.00";

      tipInput.forEach((elem) => {
        elem.classList.remove("active");
      });

      totalTip = 0;
      numOfPeopleTotal = 0;

      setTimeout(() => {
        resetButton.disabled = true;
      }, 500);
  
    });
  };

  document.querySelector("main").addEventListener("keyup", (e) => {
    let elem = e.target;

    //Set Total Tip value
    if (
      parseInt(billInput.value) > 0 &&
      elem.name === "customInput" &&
      parseInt(elem.value) > 0
    ) {
      totalTip = parseInt(customInput.value);
    }

    //Set Number of People value
    if (
      parseInt(billInput.value) > 0 &&
      elem.name === "numOfPeopleInput" &&
      parseInt(elem.value) > 0
    ) {
      numOfPeopleTotal = parseInt(elem.value);
    }

    //Show/Hide validation error message
    if (parseInt(numOfPeopleInput.value) === 0) {
      numOfPeopleInput.classList.add("error");
      error.style.display = "inline-block";
    } else {
      numOfPeopleInput.classList.remove("error");
      error.style.display = "none";
    }


    calculatorTotals = tipCalculator(
      parseInt(billInput.value),
      totalTip,
      numOfPeopleTotal
    );

    //Display Calculation Totals
    for (let prop in calculatorTotals) {
      tipPerPerson.innerHTML = formatCurrency(calculatorTotals.tipPerPerson);
      totalPerPerson.innerHTML = formatCurrency(calculatorTotals.splitBill);
    }

    resetForm();

    resetButton.disabled = false;
  });

  resetForm();

  //Various events for the tip buttons
  tipInput.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      let inputElem = e.target;

      resetButton.disabled = false;

      tipInput.forEach((otherButton) => otherButton.classList.remove("active"));
      inputElem.classList.toggle("active");

      if (parseInt(billInput.value) > 0) {
        totalTip = parseInt(inputElem.value);
        customInput.value = "";

        calculatorTotals = tipCalculator(
          parseInt(billInput.value),
          totalTip,
          numOfPeopleTotal
        );

        for (let prop in calculatorTotals) {
          tipPerPerson.innerHTML = formatCurrency(
            calculatorTotals.tipPerPerson
          );
          totalPerPerson.innerHTML = formatCurrency(calculatorTotals.splitBill);
        }
      }
    });
  });

  //Removes active class from other tip button when Custom input field is clicked
  customInput.addEventListener("click", (e) => {
    tipInput.forEach((elem) => {
      elem.classList.remove("active");
    });
  });

};

//Function that rounds off dollar price
const roundOff = (num, places) => {
  const x = Math.pow(10, places);
  return Math.round(num * x) / x;
};

//Function with third party script that formats currency fields.
const formatCurrency = (num) => {
  let dollars = new Intl.NumberFormat(`en-US`, {
    currency: `USD`,
    style: "currency",
  }).format(num);

  return dollars;
};

updateCalculator();