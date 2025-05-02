import { SQLiteDatabase } from "expo-sqlite";
import { Place } from "../models/place";

export default async function FetchDetails(
  db: SQLiteDatabase,
  id: string
): Promise<Place | null> {
  const data = await db.getFirstAsync<Place>(
    `SELECT * FROM places WHERE id = ?`,
    id
  );

  if (data) {
    return new Place(data.id, data.title, data.imageUri, data.address, {
      ...data.location,
    });
  }
  return null;
}
