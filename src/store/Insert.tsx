import { SQLiteDatabase } from "expo-sqlite";
import { Place } from "../models/place";

export default async function InsertPlace(
  db: SQLiteDatabase,
  place: Place
): Promise<number> {
  const result = await db.runAsync(
    `INSERT INTO places (title, imageUri, address, latitude, longitude) VALUES (?, ?, ?, ?, ?)`,
    place.title,
    place.imageUri,
    place.address,
    place.location.latitude,
    place.location.longitude
  );
  return result.lastInsertRowId;
}
