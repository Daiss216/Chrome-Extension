export const handleNotification = (activeAppointment) => {
  if (activeAppointment.length > 0) {
    createNotification(activeAppointment[0]);
  }
};

const createNotification = (activeAppointment) => {
  chrome.notifications.create({
    title: "Globle Entry Slot Available",
    message: `Found an open Interview at ${activeAppointment.timestamp}.`,
    iconUrl: "./images/icon-48.png",
    type: "basic",
  });
};

chrome.notifications.onClicked.addListener(() => {
  chrome.tabs.create({
    url: "https://ttp.cbp.dhs.gov/schedulerui/schedule-interview/location?lang=en&vo=true&returnUrl=ttp-external&service=up",
  });
});
