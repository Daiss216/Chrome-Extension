import { handleNotification } from "../lib/handleNotification.js";

//fetch list of open interview slots at a loc in a given timeperiod
export const fetchOpenSlot = (result) => {
  console.log(result);
  //https://ttp.cbp.dhs.gov/schedulerapi/locations/9240/slots?startTimestamp=2026-08-01T00%3A00%3A00&endTimestamp=2026-09-11T00%3A00%3A00
  const { locationId, startdate, enddate } = result;
  const appointmentUrl = `https://ttp.cbp.dhs.gov/schedulerapi/locations/${locationId}/slots?startTimestamp=${startdate}T00%3A00%3A00&endTimestamp=${enddate}T00%3A00%3A00`;
  fetch(appointmentUrl)
    .then((response) => response.json())
    .then((data) => data.filter((slot) => slot.active > 0))
    .then((data) => handleNotification(data))
    .catch((error) => console.log(error));
};
