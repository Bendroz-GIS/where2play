import { auth } from "../../auth"

const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function createEvent(json) {
  const response = await fetch(`${VITE_API_URL}/api/event/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${auth.getAccessToken()}`
      },
    body: json,
  })

  return response
}


export async function getEvents(user="") {
    const response = await fetch(`${VITE_API_URL}/api/event?user=${user}`);
    const events = await response.json();
    return events
}
