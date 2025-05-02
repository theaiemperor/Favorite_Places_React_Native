import * as SQLite from "expo-sqlite";
import Init from "./Init";
import InsertPlace from "./Insert";
import FetchPlaces from "./Fetch";
import FetchDetails from "./FetchDetails";
import RemovePlace from "./Remove";
import UpdatePlace from "./Update";
import { Place } from "../models/place";

let dbInstance: SQLite.SQLiteDatabase;

async function getDB() {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync("places.db");
  }
  return dbInstance;
}

// Initialize database
async function init(): Promise<void> {
  const db = await getDB();
  await Init(db);
}

// Insert into database
async function insert(data: Place): Promise<number> {
  const db = await getDB();
  return await InsertPlace(db, data);
}

// Fetch all places
async function fetchData(): Promise<Place[]> {
  const db = await getDB();
  return await FetchPlaces(db);
}

// Fetch single place details
async function fetchDetails(id: string): Promise<Place | null> {
  const db = await getDB();
  return await FetchDetails(db, id);
}

// Remove place
async function remove(id: number): Promise<boolean> {
  const db = await getDB();
  return await RemovePlace(db, id);
}

// Update place
async function updatePlace(place: Place): Promise<boolean> {
  const db = await getDB();
  return await UpdatePlace(db, place);
}

export { init, insert, fetchData, fetchDetails, remove, updatePlace };
