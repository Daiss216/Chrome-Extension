import { fetchLocation } from "./api/fetchLocaton.js";
import { fetchOpenSlot } from "./api/fetchOpenSlot.js";
import { createNotification } from "./lib/createNotification.js";

const ALARM_NAME = "ALARM";

let cachedPrefs = {};
let firstAppointTimestamp = null;

//CHROME API LISTENERS
chrome.runtime.onInstalled.addListener((detailes) => {
  fetchLocation();
  handleOnStop();
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

chrome.notifications.onClicked.addListener(() => {
  chrome.tabs.create({
    url: "https://ttp.cbp.dhs.gov/schedulerui/schedule-interview/location?lang=en&vo=true&returnUrl=ttp-external&service=up",
  });
});

chrome.alarms.onAlarm.addListener(() => {
  console.log("OnAlarm scheduled code runnning...");
  openSlotJob();
});

const handleOnStop = () => {
  console.log("On Stop in background");
  setRunningStatus(false);
  stopAlarm();
  cachedPrefs = {};
  firstAppointTimestamp = null; //to empty it
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
      //immediately run the job
      openSlotJob();
      chrome.alarms.create(ALARM_NAME, { periodInMinutes: 1.0 });
    }
  });
};

const stopAlarm = () => {
  chrome.alarms.clearAll();
};

const openSlotJob = () => {
  fetchOpenSlot(cachedPrefs).then((data) => handledOpenSlots(data));
};

const handledOpenSlots = (openSlots) => {
  if (
    openSlots &&
    openSlots.length > 0 &&
    openSlots[0].timestamp != firstAppointTimestamp
  ) {
    firstAppointTimestamp = openSlots[0].timestamp;
    //create Notification
    createNotification(openSlots[0], openSlots.length, cachedPrefs);
  }
};
