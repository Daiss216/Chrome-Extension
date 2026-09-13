# Chrome Extension
A lightweight Google Chrome Extension that automatically polls the official US Department of Homeland Security Trusted Traveler Program (TTP) API to find and alert you to newly dropped or cancelled interview slots before they get booked.

### Features

### Project Structure
```bash
├── manifest.json          # Extension permissions and background registrations
├── background.js         # Core background runtime pipeline management
├── popup/
│   ├── popup.html             # The interface popup panel built with Bulma
│   ├── popup.js               # Event handlers for UI buttons, dates, and select parameters
│   ├──bulma.min.css
│
├── images/
│   ├── icon-16.png
│   ├── icon-32.png
│   ├── icon-48.png        
│   └── icon-128.png
├── api/
│   ├── fetchLocation.js   
│   └── fetchOpenSlot.js      
└── lib/ 
    └── createNotification.js 
```
