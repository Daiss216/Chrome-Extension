import { fetchLocation } from "./api/fetchLocaton.js";
import { fetchOpenSlot } from "./api/fetchOpenSlot.js";

const ALARM_NAME = "ALARM";

let cachedPrefs = {};

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
  setRunningStatus(false);
  stopAlarm();
  cachedPrefs = {};
};

const handleOnStart = (prefs) => {
  console.log("prefs received: ", prefs);
  cachedPrefs = prefs;
  chrome.storage.local.set(prefs); //storing the preferences throgh storage chrome api
  setRunningStatus(true);
  createAlarm();
};

const setRunningStatus = (isRunning) => {
  chrome.storage.local.set({ isRunning });
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
  fetchOpenSlot(cachedPrefs);
});
