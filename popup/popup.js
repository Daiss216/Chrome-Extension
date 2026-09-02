//Elements
const locationIdElement = document.getElementById("locationId");
const startDateElement = document.getElementById("startdate");
const endDateElement = document.getElementById("enddate");

//Button Elements
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

startButton.onclick = () => {
  const prefs = {
    locationId: locationIdElement.value,
    startdate: startDateElement.value,
    enddate: endDateElement.value,
  };
  chrome.runtime.sendMessage({ event: "onStart", prefs });
};

stopButton.onclick = () => {
  chrome.runtime.sendMessage({ event: "onStop" });
};

//chrome storage API
chrome.storage.local.get(["locationId", "startdate", "enddate"], (result) => {
  const { locationId, startdate, enddate } = result;

  if (locationId) {
    locationIdElement.value = locationId;
  }
  if (startdate) {
    startDateElement.value = startdate;
  }
  if (enddate) {
    endDateElement.value = enddate;
  }
});
