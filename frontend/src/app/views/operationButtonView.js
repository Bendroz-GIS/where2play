import { closeElement } from "../utils/formAndPopup";
import { auth } from "../../auth"
import { errorBanner } from "../../utils/errorBanner";
import { listButtons, className } from "../config/operationButtonConfig";

function toggleActiveButton(currentButton, className) {
  if (!auth.isAuthenticated()) {
    errorBanner.display()
    return;
  }

  if (currentButton.classList.contains("activeOperation")){
    currentButton.classList.toggle("activeOperation")
    
  } else {
    const buttons = document.getElementsByClassName(className)
    for (const button of buttons) {
      button.classList.remove("activeOperation")
    };
    
    currentButton.classList.add("activeOperation")
    
  }
  closeElement("form");
};

function getActiveOperation() {
  const element = document.getElementsByClassName("activeOperation");
  if (element.length === 0) { return };
  return element[0].id;
}

function createOperationButton() {
  const operationButtonContainer = document.getElementById("operation-button-container");
  let buttonHTML = ""
  listButtons.forEach((e) => {buttonHTML += `<button id="${e.id}" class="operation map-button"><span class="material-symbols-outlined">${e.iconName}</span></button>`})
  operationButtonContainer.innerHTML = buttonHTML
  setTimeout(() => handleEvent(),0)
}

function handleEvent() {
  const buttons = document.getElementsByClassName(className);
  for (const button of buttons) {
    button.addEventListener("click", () => toggleActiveButton(button, className))
  };
}





export { getActiveOperation, createOperationButton }