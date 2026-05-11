import { checkMongoConnection } from "../db.js";

export default async function handler(_request, response) {
  try {
    const result = await checkMongoConnection();
    response.status(200).json({ status: "connected", ...result });
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: error.message
    });
  }
}
