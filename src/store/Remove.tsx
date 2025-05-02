import { SQLiteDatabase } from "expo-sqlite";
import * as FileSystem from "expo-file-system";

export default async function RemovePlace(
  db: SQLiteDatabase,
  id: number
): Promise<boolean> {
  // 1️⃣ Get image URI to delete file
  const row = await db.getFirstAsync<{ imageUri: string }>(
    `SELECT imageUri FROM places WHERE id = ?`,
    id
  );
  if (row && row.imageUri) {
    await FileSystem.deleteAsync(row.imageUri, { idempotent: true });
  }

  // 2️⃣ Remove record
  await db.runAsync(`DELETE FROM places WHERE id = ?`, id);
  return true;
}
