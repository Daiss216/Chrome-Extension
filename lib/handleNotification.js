export const handleNotification = (activeAppointment) => {
  if (activeAppointment.length > 0) {
    createNotification(activeAppointment[0]);
  }
};

const createNotification = (activeAppointment) => {
  chrome.notifications.create({
    title: "Globle Entry Slot Available",
    message: `Found an open Interview at ${activeAppointment.Timestamp}.`,
    iconUrl: "./images/icon-48.png",
    type: "basic",
  });
};
