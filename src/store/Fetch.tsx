import { SQLiteDatabase } from "expo-sqlite";
import { Place } from "../models/place";

export default async function FetchPlaces(
  db: SQLiteDatabase
): Promise<Place[]> {
  const rows = await db.getAllAsync<Place>(`SELECT * FROM places`);

  return rows.map(
    (item) =>
      new Place(item.id, item.title, item.imageUri, item.address, {
        ...item.location,
      })
  );
}
