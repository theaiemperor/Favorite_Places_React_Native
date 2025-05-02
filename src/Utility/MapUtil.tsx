import { mapObject } from "../constants/Types";

const BaseUrl = "https://nominatim.openstreetmap.org";

async function coordinatesToAddress(data: mapObject): Promise<string> {
  const URL =
    BaseUrl + `/reverse?format=json&lat=${data.latitude}&lon=${data.longitude}`;
  const req = await fetch(URL);
  const res = await req.json();
  return res.display_name;
}

export { coordinatesToAddress };
