import { EPSG_2056 } from '../config/projectionConfig';

import Geolocation from 'ol/Geolocation.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import { Style, Circle, Fill, Stroke } from 'ol/style';
import { zoomTo } from '../utils/zoom';


function toggleTracking(event, geolocation) {
  const status = geolocation.get("tracking")
  geolocation.set("tracking", !status);
  if (status) {
    feature.unset("geometry")
  }
  
  event.currentTarget.classList.toggle("active") 
  console.log("tracking status : " + !status )
}

function updateLocationLayer(view) {
  const coordinates = geolocation.getPosition();
  const baseGeometry = feature.getGeometry()
  feature.setGeometry(coordinates ? new Point(coordinates) : null)
  
  if (!baseGeometry) {
    zoomTo(view, coordinates, 13)
  }
}

function createLocationButton() {
  const container = document.getElementById("button-container");
  container.innerHTML += geolocationHTML;
}

function handleLocationEvent(view) {
  geolocation.on('change', () => updateLocationLayer(view));
  const geolocationButton = document.getElementById("geolocation");
  geolocationButton.addEventListener("click", (event) => {
    toggleTracking(event, geolocation)
  });
}

const geolocationHTML = `
<button id="geolocation" class="map-button">
  <span class="material-symbols-outlined">my_location</span>
</button>
`

const geolocation = new Geolocation({
  trackingOptions: {
    enableHighAccuracy: true
  },
  tracking: false,
  projection: EPSG_2056
});

const style = new Style({
  image: new Circle({
    radius: 6,
    fill: new Fill({
      color: 'red',
    }),
    stroke: new Stroke({
      color: 'white',
      width: 2,
    }),
  }),
});


const feature = new Feature({});
const locationLayer = new VectorLayer({
  source: new VectorSource({}),
  style: style
});

locationLayer.getSource().addFeature(feature)


export { createLocationButton, handleLocationEvent, locationLayer }