// Configuration sourced from environment variables to avoid hardcoded secrets.
// Do not commit secrets into source code.

export const AWS = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

export const githubConfig = {
  // Provided via environment variables
  token: process.env.GITHUB_TOKEN,
  owner: process.env.GITHUB_OWNER || "my-org",
};

// Use an environment variable for the database connection string.
// Example (do not commit): postgres://user:REPLACE_ME@localhost:5432/mydb
export async function connectToDb(): Promise<string | undefined> {
  const dbUrl = process.env.DATABASE_URL;
  return dbUrl;
}