import {Map, View} from 'ol';
// layer import

import { locationLayer, createLocationButton, handleLocationEvent } from './views/geolocationView';

// controls import
import { displaySportForm } from './views/sportFormView';
import { getActiveOperation } from './views/operationButtonView';
import { displayPopUp } from './views/popupView';
import { EPSG_2056 } from './config/projectionConfig';
import { enhanceDomain } from './controllers/domainController';
import { initSportLayer, sportLayer, updateSportLayer } from './views/sportView';
import { createBasemapButton, handleBasemapEvent, basemapLayer, setBasemap } from './views/basemapView';
import { jsonToFeatures, featuresToJson, saveToLocalStorage } from './controllers/sportController';

enhanceDomain()

async function loadData() {
  const storedFeatures = JSON.parse(localStorage.getItem("sportFeatures")) || [];

  if (storedFeatures.length > 0) {
    const features = await jsonToFeatures(storedFeatures)
    sportLayer.getSource().addFeatures(features);
  } else {
    await initSportLayer();
  }
  
  saveToLocalStorage()
}

function handleMapClick(event, map) {
  const coordinates = JSON.stringify(event.coordinate);
  localStorage.setItem("coordinate", coordinates);

  const operation = getActiveOperation();
  if (operation === "add") {
    displaySportForm(operation);
  } else if (operation === "edit" && map.hasFeatureAtPixel(event.pixel)) {
    const feature = map.getFeaturesAtPixel(event.pixel)[0];
    displaySportForm(operation, feature);
  } else if (map.hasFeatureAtPixel(event.pixel)) {
    const feature = map.getFeaturesAtPixel(event.pixel)[0];
    displayPopUp(feature);
  }
}


const view = new View({
  projection: EPSG_2056, 
  center: [2550000, 1150000],
  zoom: 9
})

const map = new Map({
  target: 'map',
  layers: [
    basemapLayer,
    sportLayer,
    locationLayer
  ],
  view: view,
  controls: []
});

function initMap() {
  map.on("singleclick", (event) => handleMapClick(event, map));
  loadData()

  createBasemapButton()
  handleBasemapEvent()
  setBasemap(1);

  createLocationButton()
  handleLocationEvent(view)

}



export { map, initMap }


