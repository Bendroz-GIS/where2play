import { auth } from "../../auth";

const VITE_API_URL = import.meta.env.VITE_API_URL;
console.log("API URL:", import.meta.env.VITE_API_URL);

async function getSport(featureID="") {
  const response = await fetch(`${VITE_API_URL}/api/sport?feature_id=${featureID}`);
  return await response.json();
}

async function createSport(json) {
  const response = await fetch(`${VITE_API_URL}/api/sport/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${auth.getAccessToken()}`
     },
    body: json,
  });

  return response
}


async function updateSport(json, featureID) {
  const response = await fetch(`${VITE_API_URL}/api/sport/modify/${featureID}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth.getAccessToken()}`
    },
    body: json,
  });

  return response
}

async function deleteSport(featureID) {
  const response = await fetch(`${VITE_API_URL}/api/sport/delete/${featureID}`, {
      method: "DELETE",  
      headers: {
        'Authorization': `Bearer ${auth.getAccessToken()}`
      },
  });

  return response
}

export { getSport, createSport, updateSport, deleteSport };