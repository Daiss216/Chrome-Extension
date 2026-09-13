export const createNotification = (openSlot, numberOfSlots, prefs) => {
  const { tzData } = prefs;

  let message = `Found an open Interview at ${openSlot.timestamp} (${tzData} timezone).`;
  if (numberOfSlots > 1) {
    message = `${message} and ${numberOfSlots - 1} additional open Interviews.`;
  }

  chrome.notifications.create({
    title: "Globle Entry Slot Available",
    message,
    iconUrl: "./images/icon-48.png",
    type: "basic",
  });
};
