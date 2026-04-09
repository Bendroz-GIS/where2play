import { displayEventForm } from "./eventFormView";
import { closeElement } from "../utils/formAndPopup";

async function displayPopUp(feature) {

  await closeElement("popup")

  const sport = feature.get("sport_txt");
  const revetement = feature.get("revetement_txt");
  const etat = feature.get("etat_txt");
  const estPublique = feature.get("est_publique_txt");
  const remarque = feature.get("remarque");
  const dateModification = feature.get("date_modification");
  const gUrl = feature.get("g_url");


  const popupHTML = `
  <div id="popup" class="popup">
    <div class="top-popup">
      <button type="button" id="create-event">créer un évènement</button>
      <button type="button" id="close-popup"><span class="material-symbols-outlined">close</span></button>
    </div>
    
    <div class="main-popup">
      <div class="info">
        <span class="title">Sport</span>
        <span class="value">${sport}</span>
      </div>
      <div class="info">
        <span class="title">Revêtement</span>
        <span class="value">${revetement}</span>
      </div>
      <div class="info">
        <span class="title">Etat</span>
        <span class="value">${etat}</span>
      </div>
      <div class="info">
        <span class="title">Est publique</span>
        <span class="value">${estPublique}</span>
      </div>
      <div class="info">
        <span class="title">Remarque</span>
        <span class="value">${remarque}</span>
      </div>
      <div class="info">
        <span class="title">Date de modification</span>
        <span class="value">${dateModification}</span>
      </div>
      <div class="info">
        <span class="title">Lien itinéraire</span>
        <a target="_blank" href="${gUrl}" class="value">lien</a>
      </div>
    </div>
  </div>
  `;

  document.getElementById("popup-container").innerHTML = popupHTML;
  document.getElementById("close-popup").addEventListener("click", () => {
    closeElement("popup")
  });

  document.getElementById("create-event").addEventListener("click", () => {
    closeElement("popup")
    displayEventForm(feature)
  });

  const popup = document.getElementById("popup");
  setTimeout(() => popup.classList.add("show"), 10);
  
}


export { displayPopUp }