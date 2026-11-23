import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { getDatabase } from "../db.js";

const scrypt = promisify(scryptCallback);
const SESSION_DAYS = 14;
const COOKIE_NAME = "qorvexa_session";
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@bundeskonto.de").trim().toLowerCase();

function send(response, status, payload) {
  response.status(status).json(payload);
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeUserId(value) {
  return String(value || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function parseCookies(request) {
  return Object.fromEntries(String(request.headers.cookie || "").split(";").map((part) => {
    const separator = part.indexOf("=");
    if (separator < 0) return ["", ""];
    return [part.slice(0, separator).trim(), decodeURIComponent(part.slice(separator + 1).trim())];
  }).filter(([name]) => name));
}

function setSessionCookie(response, token) {
  const secure = process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
  response.setHeader("Set-Cookie", `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_DAYS * 86400}${secure ? "; Secure" : ""}`);
}

function clearSessionCookie(response) {
  const secure = process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
  response.setHeader("Set-Cookie", `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure ? "; Secure" : ""}`);
}

function tokenHash(token) {
  return createHash("sha256").update(token).digest("hex");
}

async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const derived = await scrypt(password, salt, 64);
  return `${salt}:${derived.toString("hex")}`;
}

async function verifyPassword(password, storedHash) {
  if (typeof storedHash !== "string" || !storedHash.includes(":")) return false;
  const [salt, expectedHex] = storedHash.split(":");
  const expected = Buffer.from(expectedHex, "hex");
  const actual = await scrypt(password, salt, expected.length);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function publicUser(user) {
  const { passwordHash, ...safe } = user;
  return safe;
}

async function createSession(db, user) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 86400000);
  await db.collection("authSessions").insertOne({
    tokenHash: tokenHash(token),
    userId: user.id,
    expiresAt,
    createdAt: new Date()
  });
  return token;
}

export async function getSessionUser(request, db) {
  const token = parseCookies(request)[COOKIE_NAME];
  if (!token) return null;
  const session = await db.collection("authSessions").findOne({ tokenHash: tokenHash(token), expiresAt: { $gt: new Date() } });
  if (!session) return null;
  const user = await db.collection("users").findOne({ id: session.userId });
  return user ? publicUser(user) : null;
}

function validProfile(profile) {
  return profile && typeof profile === "object" &&
    String(profile.firstName || "").trim() && String(profile.lastName || "").trim() &&
    normalizeEmail(profile.email) && normalizeUserId(profile.userId);
}

async function registerUser(db, body) {
  const profile = body.profile || body;
  const email = normalizeEmail(profile.email);
  const userId = normalizeUserId(profile.userId);
  const password = String(body.password || "");
  if (!validProfile(profile) || !password) return { status: 400, body: { message: "Complete all required account fields." } };
  if (email === ADMIN_EMAIL) return { status: 409, body: { message: "This email cannot be registered." } };
  if (userId === "ADMIN") return { status: 409, body: { message: "That User ID is reserved." } };
  if (password.length < 6) return { status: 400, body: { message: "Password must be at least 6 characters." } };
  const users = db.collection("users");
  if (await users.findOne({ $or: [{ email }, { userId }] }, { projection: { _id: 1 } })) {
    return { status: 409, body: { message: "An account with that email or User ID already exists." } };
  }
  const user = {
    ...profile,
    id: randomBytes(16).toString("hex"),
    email,
    userId,
    isAdmin: false,
    mustChangePassword: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  delete user.password;
  delete user.confirmPassword;
  delete user.passwordHash;
  user.passwordHash = await hashPassword(password);
  user.cloudAuth = true;
  try {
    await users.insertOne(user);
  } catch (error) {
    if (error.code === 11000) return { status: 409, body: { message: "An account with that email or User ID already exists." } };
    throw error;
  }
  return { status: 201, body: { user: publicUser(user) } };
}

export default async function authHandler(request, response) {
  const action = String(request.query?.action || "");
  const method = request.method || "GET";
  if (!new Set(["me", "login", "register", "logout", "change-password", "reset-password", "users"]).has(action)) {
    return send(response, 404, { message: "Authentication action not found." });
  }

  try {
    const db = await getDatabase();
    const users = db.collection("users");
    const sessions = db.collection("authSessions");
    await Promise.all([
      users.createIndex({ email: 1 }, { unique: true }),
      users.createIndex({ userId: 1 }, { unique: true }),
      users.createIndex({ id: 1 }, { unique: true }),
      sessions.createIndex({ tokenHash: 1 }, { unique: true }),
      sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })
    ]);

    if (action === "register" && method === "POST") {
      const result = await registerUser(db, request.body || {});
      if (result.status !== 201) return send(response, result.status, result.body);
      const token = await createSession(db, result.body.user);
      setSessionCookie(response, token);
      return send(response, 201, result.body);
    }

    if (action === "login" && method === "POST") {
      const identifier = String(request.body?.identifier || "").trim();
      const password = String(request.body?.password || "");
      const email = normalizeEmail(identifier);
      const userId = normalizeUserId(identifier);
      let user = await users.findOne({ $or: [{ email }, { userId }] });

      const adminPassword = String(process.env.ADMIN_PASSWORD || "");
      const adminPasswordMatches = adminPassword && timingSafeEqual(
        createHash("sha256").update(password).digest(),
        createHash("sha256").update(adminPassword).digest()
      );
      if (email === ADMIN_EMAIL && adminPasswordMatches) {
        user = {
          id: "server-admin",
          userId: "ADMIN",
          firstName: "Bank",
          lastName: "Administrator",
          email: ADMIN_EMAIL,
          phone: "",
          address: "",
          balance: 6000000,
          savings: 0,
          iban: "DE00 0000 0000 0000 0000 00",
          cardLastDigits: "0000",
          cardFrozen: false,
          isAdmin: true,
          mustChangePassword: false,
          notifications: [],
          activities: [],
          identityVerification: { status: "approved" }
        };
        await users.updateOne({ id: user.id }, { $set: { ...user, updatedAt: new Date() } }, { upsert: true });
      } else if (!user || !await verifyPassword(password, user.passwordHash)) {
        return send(response, 401, { code: user ? "INVALID_CREDENTIALS" : "ACCOUNT_NOT_FOUND", message: "Email/User ID or password is incorrect." });
      }

      await sessions.deleteMany({ userId: user.id });
      const token = await createSession(db, user);
      setSessionCookie(response, token);
      return send(response, 200, { user: publicUser(user) });
    }

    if (action === "logout" && method === "POST") {
      const token = parseCookies(request)[COOKIE_NAME];
      if (token) await sessions.deleteOne({ tokenHash: tokenHash(token) });
      clearSessionCookie(response);
      return send(response, 200, { ok: true });
    }

    const user = await getSessionUser(request, db);
    if (action === "me" && method === "GET") {
      return user ? send(response, 200, { user }) : send(response, 401, { user: null });
    }
    if (!user) return send(response, 401, { message: "Please sign in again." });

    if (action === "change-password" && method === "POST") {
      const password = String(request.body?.password || "");
      if (password.length < 12) return send(response, 400, { message: "Password must be at least 12 characters." });
      await users.updateOne({ id: user.id }, { $set: { passwordHash: await hashPassword(password), mustChangePassword: false, updatedAt: new Date() } });
      const currentTokenHash = tokenHash(parseCookies(request)[COOKIE_NAME]);
      await sessions.deleteMany({ userId: user.id, tokenHash: { $ne: currentTokenHash } });
      await sessions.updateOne({ userId: user.id, tokenHash: currentTokenHash }, { $set: { expiresAt: new Date(Date.now() + SESSION_DAYS * 86400000) } });
      return send(response, 200, { ok: true });
    }

    if (action === "reset-password" && method === "POST") {
      if (!user.isAdmin) return send(response, 403, { message: "Administrator access required." });
      const targetId = String(request.body?.userId || "");
      const password = String(request.body?.password || "");
      const profile = request.body?.profile;
      if (password.length < 12) return send(response, 400, { message: "Temporary password must be at least 12 characters." });
      let target = await users.findOne({ id: targetId, isAdmin: { $ne: true } });
      let created = false;
      const passwordHash = await hashPassword(password);

      if (!target && profile && validProfile(profile)) {
        const email = normalizeEmail(profile.email);
        const userId = normalizeUserId(profile.userId);
        if (email === ADMIN_EMAIL || userId === "ADMIN") {
          return send(response, 400, { message: "That account cannot be reset." });
        }
        target = await users.findOne({ $or: [{ email }, { userId }], isAdmin: { $ne: true } });
        if (!target) {
          target = {
            ...profile,
            id: randomBytes(16).toString("hex"),
            email,
            userId,
            isAdmin: false,
            cloudAuth: true,
            mustChangePassword: true,
            passwordHash,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          delete target.password;
          delete target.confirmPassword;
          delete target._id;
          try {
            await users.insertOne(target);
            created = true;
          } catch (error) {
            if (error.code !== 11000) throw error;
            target = await users.findOne({ $or: [{ email }, { userId }], isAdmin: { $ne: true } });
          }
        }
      }

      if (!target) return send(response, 404, { message: "Account not found." });
      if (!created) {
        await users.updateOne({ id: target.id, isAdmin: { $ne: true } }, { $set: { passwordHash, mustChangePassword: true, updatedAt: new Date() } });
        target = await users.findOne({ id: target.id, isAdmin: { $ne: true } });
      }
      await sessions.deleteMany({ userId: target.id });
      return send(response, 200, { ok: true, user: publicUser(target) });
    }

    if (action === "users" && method === "GET") {
      if (!user.isAdmin) return send(response, 403, { message: "Administrator access required." });
      const list = await users.find({ isAdmin: { $ne: true } }, { projection: { passwordHash: 0, _id: 0 } }).sort({ createdAt: -1 }).toArray();
      return send(response, 200, { users: list });
    }

    response.setHeader("Allow", action === "me" || action === "users" ? "GET" : "POST");
    return send(response, 405, { message: "Method not allowed." });
  } catch (error) {
    console.error("Authentication API error:", error.message);
    return send(response, 500, { message: "Authentication service is temporarily unavailable." });
  }
}

