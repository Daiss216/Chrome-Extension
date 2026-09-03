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
    tzData:
      locationIdElement.options[locationIdElement.selectedIndex].getAttribute(
        "data-tz",
      ), //give element itself
  };
  chrome.runtime.sendMessage({ event: "onStart", prefs });
};

stopButton.onclick = () => {
  chrome.runtime.sendMessage({ event: "onStop" });
};

//chrome storage API
chrome.storage.local.get(
  ["locationId", "startdate", "enddate", "locations"],
  (result) => {
    const { locationId, startdate, enddate, locations } = result;

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
