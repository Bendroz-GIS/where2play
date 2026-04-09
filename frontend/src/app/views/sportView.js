import { dataToSportFeatures } from "../controllers/sportController";
import { sportStyle } from "../config/sportConfig";
import { getSport } from "../models/sportModel";
import { Style, Icon } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

async function initSportLayer() {
  const data = await getSport();
  const features = await dataToSportFeatures(data);
  sportLayer.getSource().clear();
  sportLayer.getSource().addFeatures(features);
  console.log("Données chargées depuis l'API")
}

async function updateSportLayer(data) {
  const features = await dataToSportFeatures(data)
}

async function updateSportFeature(featureID, operation="") {
  const source = sportLayer.getSource()
  const feature = source.getFeatureById(featureID)

  if (!operation) {
    source.removeFeature(feature);
  } else {
    const data = await getSport(featureID)
    source.removeFeature(feature);
    const newFeature = await dataToSportFeatures(data);
    source.addFeature(newFeature[0])
  }
  
}

function createSportStyle(feature) {
  const sport = feature.get("sport");
  const symbology = sportStyle.find((e) => e.id === sport)
  const imagePath = `./images/${symbology.image}`
  return new Style({
    image: new Icon({
      src: imagePath
    })
  });
}

const sportLayer = new VectorLayer({
  source: new VectorSource({}),
  style: createSportStyle
});

export { updateSportLayer, updateSportFeature, initSportLayer, sportLayer}

