import dotenv from "dotenv";

/**
 * Centralized configuration sourced from environment variables.
 * No secrets are committed to source control.
 */
dotenv.config();

export const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
};

export const githubConfig = {
  token: process.env.GITHUB_TOKEN ?? "",
  owner: process.env.GITHUB_OWNER ?? "",
};

/**
 * Returns database connection URL from environment.
 * Keep secrets out of source code; configure via .env or runtime env.
 */
export async function connectToDb(): Promise<string> {
  const dbUrl = process.env.DATABASE_URL ?? "";
  return dbUrl;
}