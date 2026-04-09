import { closeElement } from "../utils/formAndPopup"
import { handleSubmit } from "../controllers/eventController"
import { displayEvent } from "./eventView"

async function displayEventForm(feature){

  await closeElement("popup")
  await closeElement("form")

  const formHTML = `
  <form id="event-form" class="form">
    <div class="top-form">
      <button type="button" id="close-form"><span class="material-symbols-outlined">close</span></button>
    </div>
    
    <div class="main-form">
      <div class="content">
        <label for="event_name">Nom</label>
        <input name"event_name" id="event_name" class="input-form" type="text">
      </div>
      <div class="content">
        <label for="event_date">Date</label>
        <input name"event_date" id="event_date" class="input-form" type="date">
      </div>
      <div class="content">
        <label for="max_player">Joueur max</label>
        <input name"max_player" id="max_player" class="input-form number" type="number">
      </div>


    <div class="bottom-form">
      <button id="submit" type="submit" value="submit">
        <span class="material-symbols-outlined">check</span>
      </button>
    </div>
  </form>
  `
  // écriture du formulaire dans le DOM
  const formContainer = document.getElementById("form-container")
  formContainer.innerHTML += formHTML

  const closeButton = document.getElementById("close-form");
  closeButton.addEventListener("click", () => {
    closeElement("form")
  });

  const form = document.getElementById("event-form")
  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const response = await handleSubmit(feature)
    if (response) {
      displayEvent("event-container");
      closeElement("form")
    } else {
      console.log(response.text())
    }
  })
  setTimeout(() => form.classList.add("show"), 10);
}

export { displayEventForm }