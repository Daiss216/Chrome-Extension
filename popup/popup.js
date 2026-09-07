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

//Error message
const locationIdError = document.getElementById("locationIdError");
const startDateError = document.getElementById("startDateError");
const endDateError = document.getElementById("endDateError");

//helper methods
const hideElement = (elem) => {
  elem.style.display = "none";
};

const showElement = (elem) => {
  elem.style.display = "";
};

const disableElement = (elem) => {
  elem.disabled = true;
};

const enableElement = (elem) => {
  elem.disabled = false;
};

const handleOnStartState = () => {
  //span
  showElement(runningSpan);
  hideElement(stoppedSpan);

  //buttons
  disableElement(startButton);
  enableElement(stopButton);

  //inputs
  disableElement(locationIdElement);
  disableElement(startDateElement);
  disableElement(endDateElement);
};

const handleOnStopState = () => {
  //span
  hideElement(runningSpan);
  showElement(stoppedSpan);

  //buttons
  disableElement(stopButton);
  enableElement(startButton);

  //inputs
  enableElement(locationIdElement);
  enableElement(startDateElement);
  enableElement(endDateElement);
};

//validating inputs
const onStartValidation = () => {
  if (!locationIdElement.value) {
    showElement(locationIdError);
  } else {
    hideElement(locationIdError);
  }

  if (!startDateElement.value) {
    showElement(startDateError);
  } else {
    hideElement(startDateError);
  }

  if (!endDateElement.value) {
    showElement(endDateError);
  } else {
    hideElement(endDateError);
  }

  return (
    locationIdElement.value && startDateElement.value && endDateElement.value
  );
};

startButton.onclick = () => {
  const allFieldValid = onStartValidation();

  if (allFieldValid) {
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
  }
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
