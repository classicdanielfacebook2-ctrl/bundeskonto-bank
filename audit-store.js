import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { getDatabase } from "./db.js";

const MAX_EVENTS = 5000;
const DEFAULT_STORE_FILE =
  process.env.VERCEL === "1"
    ? path.join(os.tmpdir(), "bundeskonto-audit-events.json")
    : path.join(process.cwd(), ".data", "audit-events.json");

const storeFile = process.env.AUDIT_STORE_FILE || DEFAULT_STORE_FILE;
let mongoUnavailable = false;

async function readFileEvents() {
  try {
    const raw = await fs.readFile(storeFile, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.events) ? parsed.events : [];
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function writeFileEvents(events) {
  await fs.mkdir(path.dirname(storeFile), { recursive: true });
  await fs.writeFile(
    storeFile,
    JSON.stringify({ events: events.slice(0, MAX_EVENTS) }, null, 2)
  );
}

function newestFirst(events) {
  return [...events].sort((first, second) => {
    const firstDate = new Date(first.createdAt || 0).getTime();
    const secondDate = new Date(second.createdAt || 0).getTime();
    return secondDate - firstDate;
  });
}

async function withMongo(operation) {
  if (mongoUnavailable) {
    throw new Error("MongoDB is unavailable; using file audit store.");
  }

  try {
    const db = await getDatabase();
    return await operation(db);
  } catch (error) {
    mongoUnavailable = true;
    throw error;
  }
}

export async function insertAuditEvent(event) {
  const savedEvent = {
    ...event,
    createdAt: new Date().toISOString()
  };

  try {
    const insertedId = await withMongo(async (db) => {
      const result = await db.collection("auditEvents").insertOne(savedEvent);
      return result.insertedId;
    });
    return { insertedId, storage: "mongodb" };
  } catch (_error) {
    const events = newestFirst([savedEvent, ...(await readFileEvents())]);
    await writeFileEvents(events);
    return { insertedId: savedEvent.id || savedEvent.createdAt, storage: "file" };
  }
}

export async function listAuditEvents(limit = 200) {
  const safeLimit = Math.min(Number(limit) || 200, 500);

  try {
    const events = await withMongo((db) =>
      db
        .collection("auditEvents")
        .find({})
        .sort({ createdAt: -1 })
        .limit(safeLimit)
        .toArray()
    );
    return { events, storage: "mongodb" };
  } catch (_error) {
    const events = newestFirst(await readFileEvents()).slice(0, safeLimit);
    return { events, storage: "file" };
  }
}

export async function checkAuditStore() {
  try {
    await withMongo((db) => db.command({ ping: 1 }));
    return { ok: true, storage: "mongodb" };
  } catch (error) {
    const events = await readFileEvents();
    return {
      ok: true,
      storage: "file",
      events: events.length,
      mongoError: error.message
    };
  }
}
