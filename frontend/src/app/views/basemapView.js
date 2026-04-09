// openlayer
import XYZ from "ol/source/XYZ";
import TileLayer from "ol/layer/Tile";

// import
import { listBasemap } from "../config/basemapConfig";


function createBasemapButton() {
  let basemapChoice = "";
  listBasemap.forEach(e => {
    basemapChoice += `
    <button type="button" class="change-basemap" id="${e.id}" style="background-image: url(${e.image}); object-fit: cover;"></button>
    `
  });

  const basemapButton = `
    <button type="button" id="basemap-button" class="map-button"><span class="material-symbols-outlined">layers</span></button>
    <div id="basemap-choice" >
      ${basemapChoice}
    </div>`

  const basemapButtonContainer = document.getElementById("basemap-button-container");
  basemapButtonContainer.innerHTML = basemapButton

  setTimeout(() => handleBasemapEvent(),10)
}

function handleBasemapEvent() {
  const basemapButton = document.getElementById("basemap-button");
  const basemapChoice = document.getElementById("basemap-choice");
  basemapButton.addEventListener("click", (e) => {
    basemapChoice.classList.toggle("show");
  })

  const buttons = document.getElementsByClassName("change-basemap");
  for (const button of buttons) {
    button.addEventListener("click", () => setBasemap(parseInt(button.id)));
  }
}

function setBasemap(basemapID) {
  const selectedBasemap = listBasemap.find((e) => e.id === basemapID);
  const currentUrl = basemapLayer.getSource().getUrls();

  if (currentUrl !== null && currentUrl[0] === selectedBasemap?.url) {
    return;
  }

  if (selectedBasemap) {
    basemapLayer.setSource(new XYZ({ url: selectedBasemap.url }));
  } else {
    console.log(`Erreur ! l'ID "${basemapID}" n'existe pas`);
  }
}

let basemapLayer = new TileLayer({
  source: new XYZ({
    url: "",
    id: "",
  }),
});


export { createBasemapButton, handleBasemapEvent, setBasemap, basemapLayer}