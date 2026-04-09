import { listDomain } from "../config/domainConfig";
import { closeElement } from "../utils/formAndPopup";
import { handleDelete, handleSubmit, saveToLocalStorage } from "../controllers/sportController";
import { updateSportLayer } from "./sportView";
import { updateSportFeature } from "./sportView";


function createSelectFromList(data, id, label, defaultValue="") {
  defaultValue = defaultValue === null ? "" : defaultValue
  let array = data.slice(); // copie pour ne pas modifier le domaine
  array.unshift({code: "",valeur: ""}); // ajout valeur "vide"
  

  let optionHTML = "";
  for (const e of array) {
    const isSelected = defaultValue === e.code ? "selected" : "" // sélectionne l'option par défaut
    optionHTML += `<option ${isSelected}  value=${e.code}>${e.valeur}</option>`
  };

  const selectHTML = `
  <div class="form-content">
    <label for="${id}">${label}</label>
    <select name="${id}" id="${id}" class="input-form number">${optionHTML}</select>
  </div>
  `
  return selectHTML
}

function createHTMLSport(operation, formID, feature) {
  let contentFormHTML = ""
  for (const domain of listDomain) {
    const attributeValue = operation === "edit" ? feature.get(domain.id) : ""; // edit => retourne valeur de l'attribut
    const selectHTML = createSelectFromList(domain.data, domain.id, domain.name, attributeValue)
    contentFormHTML += selectHTML
  }

  let remarqueValue = "";
  if (operation === "edit") {
    remarqueValue = feature.get("remarque") === null ? "" : feature.get("remarque");
  }

  const deleteButton = operation === "edit" ? `<button type="button" id="delete-feature"><span class="material-symbols-outlined">delete</span></button>` : "";

  const formHTML = `
  <form id="${formID}" class="form">
    <div class="top-form">
      <button type="button" id="close-form"><span class="material-symbols-outlined">close</span></button>
    </div>
    
    <div class="main-form">
      ${contentFormHTML}
      <div class="form-content">
        <label for="remarque">Remarque:</label>
        <textarea id="remarque" class="input-form text" name="remarque">${remarqueValue}</textarea>
      </div>
    </div>

    <div class="bottom-form">
      <button id="submit" type="submit" value="submit">
        <span class="material-symbols-outlined">check</span>
      </button>
      ${deleteButton}
    </div>
  </form>
  `

  return formHTML
}

async function displaySportForm(operation, feature=""){
  await closeElement("form")
  await closeElement("popup")  

  const formID = operation + "Form";
  const formHTML = createHTMLSport(operation, formID, feature);
  
  const formContainer = document.getElementById("form-container")
  formContainer.innerHTML += formHTML

  const closeButton = document.getElementById("close-form");
  closeButton.addEventListener("click", () => {
    closeElement("form")
  });

  const form = document.getElementById(formID)
  form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const [response, featureID] = await handleSubmit(operation, feature);
    if (response) {
      await updateSportFeature(featureID, operation);
      saveToLocalStorage()
      closeElement("form")
    } else {
      console.log(response.text())
    } 
  })


  if (operation === "edit") {
    const featureID = feature.get("id");
    const deleteButton = document.getElementById("delete-feature");
    deleteButton.addEventListener("click", async () => {
      console.log(featureID)
      const response = await handleDelete(featureID)
      if (response) {
        await updateSportFeature(featureID)
        saveToLocalStorage()
        closeElement("form")
      } else {
        console.log(response)
        console.log(response.text())
      }
    });
  }
  // Délai pour annimation
  setTimeout(() => form.classList.add("show"), 10);
}





export { displaySportForm }