import { auth } from "../auth.js";
import { errorBanner } from "./errorBanner.js";


function handleLoginAccess() {
  if (!auth.isAuthenticated()) {
    window.location.href = "login.html"
   }
}

function handleDashboardAccess() {
  if (!auth.isAuthenticated()) { 
    errorBanner.display();
    return;
  }

  window.location.href = "dashboard.html" 
}

function setAccess() {
  const dashboardLink = document.getElementById("dashboard-link");
  const loginLink = document.getElementById("login-link");
  
  dashboardLink.addEventListener("click", () => handleDashboardAccess());
  loginLink.addEventListener("click", () => handleLoginAccess())
}

function toggleActivePage() {
  mapContainer.classList.toggle("active");
  eventContainer.classList.toggle("active");
  mapButton.classList.toggle("active");
  eventButton.classList.toggle("active");
}

function handlePageNav(target) {
  if (target === "map") {
    if (!mapContainer.classList.contains("active")) {
      toggleActivePage()
    }
  } else {
    if (!eventContainer.classList.contains("active")) {
      toggleActivePage()
    }
  }
}

function handleNavigationEvent() {
  mapButton.addEventListener("click", () => handlePageNav("map"))
  eventButton.addEventListener("click", () => handlePageNav("event"))
}


const mapContainer = document.getElementById("map-container");
const eventContainer = document.getElementById("event");
const mapButton = document.getElementById("map-page");
const eventButton = document.getElementById("event-page");



export { setAccess, handlePageNav, handleNavigationEvent }


