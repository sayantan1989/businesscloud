import dotenv from "dotenv";
dotenv.config();

// Load sensitive configuration from environment variables. Do not hardcode secrets.
export const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
};

export const githubConfig = {
  // Token should be provided via env var; never commit tokens
  token: process.env.GITHUB_TOKEN || "",
  owner: process.env.GITHUB_OWNER || "my-org",
};

export async function connectToDb() {
  // Use DATABASE_URL from environment instead of hardcoding credentials
  const dbUrl = process.env.DATABASE_URL || "";
  return dbUrl;
}