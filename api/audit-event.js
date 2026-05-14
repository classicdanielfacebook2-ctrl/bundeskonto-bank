import { getDatabase } from "../db.js";

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

export default async function handler(request, response) {
  if (request.method === "GET") {
    try {
      const db = await getDatabase();
      const limit = Math.min(Number(request.query?.limit) || 200, 500);
      const events = await db
        .collection("auditEvents")
        .find({})
        .sort({ createdAt: -1 })
        .limit(limit)
        .toArray();
      response.status(200).json({ events });
    } catch (error) {
      response.status(500).json({
        status: "error",
        message: error.message
      });
    }
    return;
  }

  if (request.method !== "POST") {
    response.setHeader("Allow", "GET, POST");
    response.status(405).json({ message: "Method not allowed" });
    return;
  }

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
}
