import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "bundeskonto";

let clientPromise;

export function getMongoClient() {
  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (!clientPromise) {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    });
    clientPromise = client.connect();
  }

  return clientPromise;
}

export async function getDatabase() {
  const client = await getMongoClient();
  return client.db(dbName);
}

export async function checkMongoConnection() {
  const client = await getMongoClient();
  await client.db("admin").command({ ping: 1 });
  return { ok: true, database: dbName };
}
