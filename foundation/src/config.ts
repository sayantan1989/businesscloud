/* Centralized configuration: load secrets from environment variables.
   Do NOT hardcode secrets in source code. */
import 'dotenv/config';

export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

export const githubConfig = {
  token: process.env.GITHUB_TOKEN,
  owner: process.env.GITHUB_OWNER,
};

export async function connectToDb() {
  // Use DATABASE_URL from environment (e.g., postgres://user:pass@host:port/db)
  const dbUrl = process.env.DATABASE_URL;
  return dbUrl;
}