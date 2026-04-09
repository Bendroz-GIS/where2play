import { auth } from "../../auth";
import { getInputValue } from "../utils/formAndPopup";;
import { createEvent } from "../models/eventModel";


async function handleSubmit(feature) {
  let obj = getInputValue()
  const user = auth.getUserInfo();
  obj["user_id"] = user.user_id;
  obj["player"] = 0;
  obj["terrain_id"] = feature.get("id");

  const json = JSON.stringify(obj);
  
  const response = await createEvent(json);

  return response.ok
}

export { handleSubmit }