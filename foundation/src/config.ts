import "dotenv/config";

export const awsConfig = {
  // Read AWS credentials from environment variables instead of hardcoding
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
} as const;

export const githubConfig = {
  // Read GitHub token and owner from environment variables
  token: process.env.GITHUB_TOKEN,
  owner: process.env.GITHUB_OWNER,
} as const;

// Prefer fetching connection string from environment
export function getDatabaseUrl(): string | undefined {
  return process.env.DATABASE_URL;
}

// Kept for compatibility with previous API surface
export async function connectToDb() {
  const dbUrl = process.env.DATABASE_URL;
  return dbUrl;
}