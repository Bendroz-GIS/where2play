import { getEvents } from "../models/eventModel";
import { zoomTo } from "../utils/zoom"
import { handlePageNav } from "../../utils/navigation";
import { sportLayer } from "./sportView";
import { map } from "../map";




async function displayEvent(containerId, user=""){
  const container = document.getElementById(containerId)
  const events = await getEvents(user);
  events.sort()
  let eventHTML = createHTMLEvent(events, containerId)
  if (!eventHTML) {
    eventHTML = `<span >aucun événement</span>`
  }
  console.log(containerId)
  container.innerHTML = eventHTML;
  container.classList.remove('loading');
  handleZoomButton()
}

function createHTMLEvent(events, containerId) {
  let eventHTML = ""
  for (const event of events) {
    const zoomButton = containerId != "event-container" ? "" : `<button class="zoom-button" data-featureid="${event.terrain_id}">afficher le terrain</button>`;
    const editButton = containerId == "event-data" ? `<button class="edit-button" data-featureid="${event.terrain_id}">modifier</button>` : "";
    console.log(zoomButton)
    const date = new Date(event.event_date)
    eventHTML += `
      <div class="event">
        <h4 class="name">${event.event_name}</h4>
        <div class="event-info">
          <div class="info">
            <span class="attribute"><strong>Date : </strong></span>
            <span>${date.toLocaleDateString()}</span>
          </div>
          <div class="info">
            <span class="attribute"><strong>Nombre de joueur max : </strong></span>
            <span>${event.max_player}</span>
          </div>
          <div class="info">
            <span class="attribute"><strong>Nombre de joueur inscris : </strong></span>
            <span>${event.player}</span>
          </div>
        </div>
        ${zoomButton}
        ${editButton}
      </div>
    `
  };

  return eventHTML
}

function handleZoomButton() { 
  const zoomButtons = document.getElementsByClassName("zoom-button");
  const len = zoomButtons.length  

  for (var i = 0; i < len; i++) {  
    zoomButtons[i].addEventListener("click", (event) => {
      const featureID = event.currentTarget.getAttribute("data-featureid");
      const feature = sportLayer.getSource().getFeatureById(featureID)
      const coordinates = feature.getGeometry().getCoordinates()
      const view = map.getView();
      handlePageNav("map")
      zoomTo(view, coordinates, 13)  
    }) 
  }
}
  
export { displayEvent, createHTMLEvent }
