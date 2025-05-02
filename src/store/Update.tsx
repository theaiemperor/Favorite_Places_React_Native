import { SQLiteDatabase } from "expo-sqlite";
import { Place } from "../models/place";

export default async function UpdatePlace(
  db: SQLiteDatabase,
  place: Place
): Promise<boolean> {
  await db.runAsync(
    `UPDATE places
       SET title = ?, imageUri = ?, address = ?, latitude = ?, longitude = ?
     WHERE id = ?`,
    place.title,
    place.imageUri,
    place.address,
    place.location.latitude,
    place.location.longitude,
    place.id
  );
  return true;
}
