import dotenv from "dotenv";

// Load environment variables from .env if present
dotenv.config();

/**
 * Configuration loaded from environment variables.
 * Do NOT hardcode secrets in source code.
 */

export const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
};

export const githubConfig = {
  // Provide GitHub token via environment variable GITHUB_TOKEN
  token: process.env.GITHUB_TOKEN || "",
  owner: process.env.GITHUB_OWNER || "",
};

export async function connectToDb() {
  // Connection string should be provided via environment variable DB_URL
  const dbUrl = process.env.DB_URL || "";
  return dbUrl;
}