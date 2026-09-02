//Elements
const locationIdElement = document.getElementById("locationId");
const startDateElement = document.getElementById("startdate");
const endDateElement = document.getElementById("enddate");

//Button Elements
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

startButton.onclick = function () {
  if (startDateElement.value) {
    console.log("Start Date Element:", startDateElement.value);
  } else {
    console.log("Start Date is Invalid!");
  }
};

stopButton.onclick = function () {
  console.log("End date:", endDateElement.value);
};
