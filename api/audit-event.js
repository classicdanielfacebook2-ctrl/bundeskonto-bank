import { insertAuditEvent, listAuditEvents } from "../audit-store.js";

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
      const result = await listAuditEvents(request.query?.limit);
      response.status(200).json(result);
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
    const event = {
      ...redactSensitiveValues(request.body)
    };
    const result = await insertAuditEvent(event);
    response.status(201).json(result);
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: error.message
    });
  }
}
