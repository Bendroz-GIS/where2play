import { getSport, createSport, updateSport, deleteSport } from "../models/sportModel";
import { getInputValue } from "../utils/formAndPopup";
import { auth } from "../../auth";
import { sportLayer } from "../views/sportView";
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';


async function dataToSportFeatures(data) {
  const features = await data.map((point) => {
    const feature = new Feature({
      geometry: new Point(point.geometry.coordinates),
      id: point.id,
      sport: point.sport,
      sport_txt: point.sport_txt,
      revetement: point.revetement,
      revetement_txt: point.revetement_txt,
      etat: point.etat,
      etat_txt: point.etat_txt,
      est_publique: point.est_publique,
      est_publique_txt: point.est_publique_txt,
      remarque: point.remarque,
      date_modification: point.date_modification,
      g_url: point.g_url,
    });

    feature.setId(point.id);
    return feature;
  })

  return features
};

function featuresToJson(features) {
  return features.map(feature => {
      const coordinates = feature.getGeometry().getCoordinates()
      const props = feature.getProperties();
      delete props.geometry; 
      return {
          type: "Feature",
          properties: props,
          geometry: {
            coordinates: coordinates,
            type: "Point"
          }
      };
  });
}

function saveToLocalStorage() {
  localStorage.setItem(
    "sportFeatures",
    JSON.stringify(
      featuresToJson(sportLayer.getSource().getFeatures())
    )
  );
}

function jsonToFeatures(featuresJson) {
  return featuresJson.map(f => {
      const feature = new Feature(f.properties);
      feature.setGeometry(new Point(f.geometry.coordinates));
      feature.setId(f.properties.id);
      return feature;
  });
}


function coordinateToWKT() {
  const coordinate = JSON.parse(localStorage.getItem("coordinate", "value"))
  const geomWKT = 'POINT(' + coordinate[0] + ' ' + coordinate[1] + ')';
  return geomWKT
}


async function handleSubmit(operation, feature) { 
  let obj = getInputValue();
  const WKT = coordinateToWKT();
  const user = auth.getUserInfo();
  obj["user_id"] = user.user_id
  obj["geom"] = WKT;

  const json = JSON.stringify(obj)
  
  let response = "";
  let featureID = "";
  if (operation === "add") {
    response = await createSport(json)
    const jsonResponse = await response.json();
    featureID = jsonResponse.id
    console.log(featureID)
  } else if (operation === "edit") {
    featureID = feature.get("id")
    response = await updateSport(json, featureID)
  }

  return [response.ok, featureID]
}

async function handleDelete(featureID) {
  const response = await deleteSport(featureID)

  return response.ok
}

export { dataToSportFeatures, saveToLocalStorage, featuresToJson, jsonToFeatures, handleSubmit, handleDelete  };