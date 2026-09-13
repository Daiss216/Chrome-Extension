# Chrome Extension- _Global Entry Drop Notifier_
A lightweight Google Chrome Extension that automatically polls the official US Department of Homeland Security Trusted Traveler Program (TTP) API to find and alert you to newly dropped or cancelled interview slots before they get booked.

### Features
- **Smart Slot Finder:** Automatically checks the official US government website to find open appointment slots for your interview.
- **Instant Desktop Alerts:** Pops up a Windows notification the moment a slot becomes free, even if your browser is closed.
- **Custom Date Search:** Lets you choose a specific location, start date, and end date to find matching slots.

### Project Structure
```bash
├── manifest.json              # Extension permissions and background registrations
├── background.js              # Core background runtime pipeline management
├── .gitattributes             # Prevents Windows line-ending layout warnings
├── api/
│   ├── fetchLocaton.js        # Pulls live TTP enrollment center indexes
│   └── fetchOpenSlot.js       # fetch list of specific location date intervals
├── images/
│   ├── icon-16.png            # Micro tab bar favicon asset
│   ├── icon-32.png            
│   ├── icon-48.png            # Notification badge asset layout
│   └── icon-128.png           
├── lib/
│   └── createNotification.js  # Fires pluralized chrome.notifications layout
└── popup/
    ├── bulma.min.css          # Locked interface padding framework
    ├── popup.html             # UI layout view for selecting slot
    └── popup.js               # Event handlers for UI buttons, dates, and select parameters
```

### Key Learnings
- **Chrome Extension Setup:** Learned how to build an app using Manifest V3 and pass messages between the UI popup and background scripts.
- **API Management:** Practiced fetching live information from public APIs and filtering through large datasets using JavaScript.
