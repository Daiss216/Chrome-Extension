import fetchLocation from "./api/fetchLocaton.js";

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
};

const handleOnStart = (prefs) => {
  console.log("On Start in background");
  console.log("prefs received: ", prefs);
  chrome.storage.local.set(prefs); //storing the preferences throgh storage chrome api
};
