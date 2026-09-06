import fetchLocation from "./api/fetchLocaton.js";
const ALARM_NAME = "ALARM";

chrome.runtime.onInstalled.addListener((detailes) => {
  fetchLocation();
});

chrome.runtime.onMessage.addListener((data) => {
  const { event, prefs } = data; //destructuring
  switch (event) {
    case "onStop":
      handleOnStop();
      break;
    case "onStart":
      handleOnStart(prefs);
      break;
    default:
      break;
  }
});

const handleOnStop = () => {
  console.log("On Stop in background");
  stopAlarm();
};

const handleOnStart = (prefs) => {
  console.log("prefs received: ", prefs);
  chrome.storage.local.set(prefs); //storing the preferences throgh storage chrome api
  createAlarm();
};

const createAlarm = () => {
  chrome.alarms.get(ALARM_NAME, (existingAlarm) => {
    //to avoid overlapping
    if (!existingAlarm) {
      chrome.alarms.create(ALARM_NAME, { periodInMinutes: 1.0 });
    }
  });
};

const stopAlarm = () => {
  chrome.alarms.clearAll();
};

chrome.alarms.onAlarm.addListener(() => {
  console.log("OnAlarm scheduled code runnning...");
});
