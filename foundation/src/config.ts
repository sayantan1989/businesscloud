import dotenv from "dotenv";

dotenv.config();

/**
 * Configuration sourced from environment variables.
 * This removes hardcoded secrets and avoids exposing sensitive values in code.
 */

export const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
};

export const githubConfig = {
  token: process.env.GITHUB_TOKEN ?? "",
  owner: process.env.GITHUB_OWNER ?? "",
};

export async function connectToDb() {
  // Use a database connection URL from the environment without embedding credentials in code
  const dbUrl = process.env.DB_URL ?? "";
  return dbUrl;
}