//Elements
const locationIdElement = document.getElementById("locationId");
const startDateElement = document.getElementById("startdate");
const endDateElement = document.getElementById("enddate");

//Button Elements
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

//Span listeners
const runningSpan = document.getElementById("runningSpan");
const stoppedSpan = document.getElementById("stoppedSpan");

//helper methods
const hideElement = (elem) => {
  elem.style.display = "none";
};

const showElement = (elem) => {
  elem.style.display = "";
};

const disabledElement = (elem) => {
  elem.disabled = true;
};

const unableElement = (elem) => {
  elem.disabled = false;
};

const handleOnStartState = () => {
  showElement(runningSpan);
  hideElement(stoppedSpan);
};

const handleOnStopState = () => {
  hideElement(runningSpan);
  showElement(stoppedSpan);
};

startButton.onclick = () => {
  handleOnStartState();
  const prefs = {
    locationId: locationIdElement.value,
    startdate: startDateElement.value,
    enddate: endDateElement.value,
    tzData:
      locationIdElement.options[locationIdElement.selectedIndex].getAttribute(
        "data-tz",
      ), //give element itself
  };
  chrome.runtime.sendMessage({ event: "onStart", prefs });
};

stopButton.onclick = () => {
  handleOnStopState();
  chrome.runtime.sendMessage({ event: "onStop" });
};

//chrome storage API
chrome.storage.local.get(
  ["locationId", "startdate", "enddate", "locations", "isRunning"],
  (result) => {
    const { locationId, startdate, enddate, locations, isRunning } = result;

    setLocation(locations);

    if (locationId) {
      locationIdElement.value = locationId;
    }
    if (startdate) {
      startDateElement.value = startdate;
    }
    if (enddate) {
      endDateElement.value = enddate;
    }
    if (isRunning) {
      handleOnStartState();
    } else {
      handleOnStopState();
    }
  },
);

//populationg location dropdown

//id: 16657,
// name: 'Chicago Mobile Event',
// shortName: 'Chicago Mobile Event',
// tzData: 'America/Chicago'

const setLocation = (locations) => {
  locations.forEach((location) => {
    let optionElement = document.createElement("option");
    optionElement.value = location.id;
    optionElement.innerHTML = location.name;
    optionElement.setAttribute("data-tz", location.tzData); //for timezone data
    locationIdElement.appendChild(optionElement);
  });
};
