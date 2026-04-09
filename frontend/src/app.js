import { initMap, map } from "./app/map.js";
import { auth } from "./auth.js";
import { setAccess, handleNavigationEvent } from "./utils/navigation.js";
import { handleVisibility } from "./utils/visibilityElement.js";
import { displayEvent } from "./app/views/eventView.js";
import { createOperationButton } from "./app/views/operationButtonView.js";


document.addEventListener("DOMContentLoaded", async () => {
  if (auth.isAuthenticated()) {
    const response = await auth.refreshToken();
    if (!response) { auth.logout() }
  }
  handleVisibility()
});


// NAV
handleNavigationEvent()

// EVENT

displayEvent("event-container");


createOperationButton()


auth.startTokenRefreshInterval();
initMap()
setAccess()
