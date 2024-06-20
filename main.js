let form = document.querySelector("form");
const dayInput = document.getElementById("dayInput");
const monthInput = document.getElementById("monthInput");
const yearInput = document.getElementById("yearInput");

const output_day = document.querySelector("span[data-date=output-day]");
const output_month = document.querySelector("span[data-date=output-month]");
const output_year = document.querySelector("span[data-date=output-year]");

const submitBtn = document.getElementById("btn");

let isValid = false;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
  // calculateAge();
});

dayInput.addEventListener("keyup", (e) => {});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerHTML = message;

  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerHTML = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const validateInputs = () => {
  const dayInputValue = dayInput.value.trim();
  const monthInputValue = monthInput.value.trim();
  const yearInputValue = yearInput.value.trim();

  const now = new Date();
  const year = now.getFullYear();

  if (dayInputValue === "") {
    setError(dayInput, "This field is required!");
    output_day.textContent = "--";
    output_month.textContent = "--";
    output_year.textContent = "--";
  } else if (
    Number.parseInt(dayInputValue) > 31 ||
    Number.parseInt(dayInputValue) < 1
  ) {
    setError(dayInput, "Must be bea valid day.");
  } else if (isNaN(dayInputValue)) {
    setError(dayInput, "Must be a number.");
  } else {
    // isValid = true;
    setSuccess(dayInput);
  }

  if (monthInputValue === "") {
    setError(monthInput, "This field is required!");
    return;
  } else if (
    Number.parseInt(monthInputValue) > 12 ||
    Number.parseInt(monthInputValue) < 1
  ) {
    setError(monthInput, "Must be a valid month.");
    return;
  } else if (isNaN(monthInputValue)) {
    setError(monthInput, "Must be a number.");
    return;
  } else if (
    Number.parseInt(monthInputValue) === 2 &&
    Number.parseInt(dayInputValue) > 28
  ) {
    setError(dayInput, "Less than 29");
    setError(monthInput, "Must be 28");
    // output_day.textContent = "--";
    // output_month.textContent = "--";
    // output_year.textContent = "--";
    return;
  } else {
    setSuccess(monthInput);
  }

  if (yearInputValue === "") {
    setError(yearInput, "This field is required!");
    return;
  } else if (Number.parseInt(yearInputValue) > year) {
    setError(yearInput, `Must be in the past!`);
    return;
  } else if (Number.parseInt(yearInputValue) < 1900 || yearInput.length < 4) {
    setError(yearInput, `Must be in the 1900 or more!`);
    return;
  } else if (isNaN(yearInputValue)) {
    setError(yearInput, "Must be a number.");
    return;
  } else {
    setSuccess(yearInput);
  }

  calculateAge(monthInputValue, dayInputValue, yearInputValue);
};

function resetValues() {}

function calculateAge(month, day, year) {
  // if (isValid) {
  let birthday = `${month}/${day}/${year}`;
  let birthdayObj = new Date(birthday);
  let ageDiffMill = Date.now() - birthdayObj;
  let ageDate = new Date(ageDiffMill);
  let ageYears = ageDate.getFullYear() - 1970;
  let ageMonth = ageDate.getUTCMonth();
  let ageDay = ageDate.getUTCDate() - 1;
  console.log(`Year: ${ageYears}`);
  console.log(`Month: ${ageMonth}`);
  console.log(`Day: ${ageDay}`);
  output_day.textContent = ageDay;
  output_month.textContent = ageMonth;
  output_year.textContent = ageYears;
  // }
}

// let date = new Date();
// console.log(date.getUTCDate());
