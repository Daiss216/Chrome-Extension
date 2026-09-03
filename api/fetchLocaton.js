const LOCATION_ENDPOINT =
  "https://ttp.cbp.dhs.gov/schedulerapi/locations/?temporary=false&inviteOnly=false&operational=true&serviceName=Global%20Entry";

export default function fetchLocation() {
  fetch(LOCATION_ENDPOINT) //fetch the location using fetch api
    .then((response) => response.json())
    .then((data) => {
      const filteredLocations = data.map((loc) => ({
        id: loc.id,
        name: loc.name,
        shortName: loc.shortName,
        tzData: loc.tzData,
      }));
      filteredLocations.sort((a, b) => a.name.localeCompare(b.name)); //in order
      chrome.storage.local.set({ locations: filteredLocations }); //to store
      console.log(filteredLocations);
    })
    .catch((error) => {
      //if any error occured
      console.log(error);
    });
}
