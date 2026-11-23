import { randomUUID } from "node:crypto";
import { getDatabase } from "../../db.js";
import { getSessionUser } from "../../serverless/authCore.js";

function send(response, status, payload) {
  return response.status(status).json(payload);
}

export default async function handler(request, response) {
  if (request.method !== "GET" && request.method !== "POST") {
    response.setHeader("Allow", "GET, POST");
    return send(response, 405, { message: "Method not allowed." });
  }

  try {
    const db = await getDatabase();
    const user = await getSessionUser(request, db);
    if (!user) return send(response, 401, { message: "Please sign in to continue." });

    const messages = db.collection("supportMessages");
    if (request.method === "GET") {
      if (user.isAdmin !== true) return send(response, 403, { message: "Administrator access required." });
      const items = await messages.find({}).sort({ createdAt: -1 }).limit(500).toArray();
      return send(response, 200, { messages: items });
    }

    const subject = String(request.body?.subject || "").trim();
    const message = String(request.body?.message || "").trim();
    if (!subject || subject.length > 120 || !message || message.length > 5000) {
      return send(response, 400, { message: "Enter a subject (up to 120 characters) and a message (up to 5,000 characters)." });
    }

    const record = {
      id: randomUUID(),
      subject,
      message,
      submittedBy: user.id,
      userEmail: user.email,
      userId: user.userId,
      createdAt: new Date()
    };
    await messages.insertOne(record);
    return send(response, 201, { ok: true, message: { ...record, createdAt: record.createdAt.toISOString() } });
  } catch (error) {
    console.error("Support message request failed:", error);
    return send(response, 503, { message: "The message could not be saved. Please try again." });
  }
}
