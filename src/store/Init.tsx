import { SQLiteDatabase } from "expo-sqlite";

export default async function Init(db: SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT,
      imageUri TEXT,
      address TEXT,
      latitude REAL,
      longitude REAL
    );
  `);
}
