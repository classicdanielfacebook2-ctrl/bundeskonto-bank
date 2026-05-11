import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { checkMongoConnection, getDatabase } from "./db.js";

const SENSITIVE_KEYS = new Set([
  "password",
  "confirmPassword",
  "currentPassword",
  "newPassword",
  "pin",
  "token"
]);

function redactSensitiveValues(value) {
  if (Array.isArray(value)) {
    return value.map(redactSensitiveValues);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [
        key,
        SENSITIVE_KEYS.has(key) ? "[redacted]" : redactSensitiveValues(nestedValue)
      ])
    );
  }

  return value;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 4174;

app.use(express.json({ limit: "1mb" }));

app.get("/api/mongo-health", async (_request, response) => {
  try {
    const result = await checkMongoConnection();
    response.json({ status: "connected", ...result });
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: error.message
    });
  }
});

app.post("/api/audit-event", async (request, response) => {
  try {
    const db = await getDatabase();
    const event = {
      ...redactSensitiveValues(request.body),
      createdAt: new Date()
    };
    const result = await db.collection("auditEvents").insertOne(event);
    response.status(201).json({ insertedId: result.insertedId });
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: error.message
    });
  }
});

app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`BundesKonto server listening on http://127.0.0.1:${port}`);
});
